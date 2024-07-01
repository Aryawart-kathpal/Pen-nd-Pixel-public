require('dotenv').config();
const Note = require('../models/Note');
const CustomError = require('../errors');
const {StatusCodes} = require('http-status-codes');
const {checkPermissions} = require('../utils');
const User = require('../models/User');
const {isTokenValid,sendEmail,summarizer} = require('../utils');

//title,description,content,user,tags,visibility,likes
const createNote = async(req,res)=>{
    const {title}= req.body;
    // if(!tags){
    //     throw new CustomError.BadRequestError('Please provide at least one tag');
    // }
    req.body.user = req.user.userId;

    const note = await Note.create(req.body);// only the required things will go in the database, others will be ignored if added
    res.status(StatusCodes.CREATED).json({note});
}

// by default sorted to latest(x)
// categories(x),tags,likes,date(latest,oldest)(x),year(x)
const getAllNotes= async(req,res)=>{
    const { year,sort,search,orderBy } = req.query;

    let queryObject = {};
    queryObject.visibility='public';
    
    if(year){
        const startDate = new Date(year,0,1);
        const endDate = new Date(year,11,31);

        queryObject.createdAt ={
            $gte:startDate,
            $lte:endDate,
        }
    } 

    //We use the $in operator to find documents where the tags array contains any of the tags provided in the search query.
    // if(search){
    //     queryObject.tags = { $in:search.split(',').map(tag => new RegExp(tag, 'i'))}; // Use the RegExp constructor with the 'i' flag to perform a case-insensitive search
    //     queryObject.title = {$regex:search, $options:'i'};
    // }

    // new RegExp(tag,'i') eq to $regex:search,$options:'i'    
    if (search) {
        queryObject.$or = [
            { tags: { $in: search.split(',').map(tag => new RegExp(tag, 'i')) } }, // Search by tags
            // { title: { $regex: search , $options:'i' } } // Search by name (assuming 'name' property exists in the Note model)
            {title :{$in : search.split(',').map(tag => new RegExp(tag,'i'))}}, // instead of searching on just one title value as above I can do on all the search items
            {category : {$in:search.split(',').map(tag=> new RegExp(tag,'i'))}}
        ];
    }

    //The $or operator in MongoDB allows you to perform a logical OR operation between multiple query conditions. It's commonly used when you want to find documents that match any of the specified conditions, so the second method works

    // console.log(queryObject['$or'].title);
    // console.log(queryObject['$or'][0].tags['$in']);

    let result = Note.find(queryObject).populate({
        path : 'user',
        select : 'name image createdAt about numOfFollowers'
    }).populate('comments',['name','comment','user']).populate('likedBy',['name','image'])
    .populate({
        path : 'sharedWith',
        select : '_id email'
    }); // this way, will get only the name,image

    // Any of the both below ways can be used to sort based on likes and the createdAt

    if(!sort || sort==='latest' || sort!=='oldest'){
        if(orderBy==='likes')
            result = result.sort('-likes -createdAt'); //result = result.sort({ likes:-1,createdAt:-1 }) ->same and order matters in both
        else 
            result = result.sort('-createdAt');
    }
    if(sort==='oldest'){
        if(orderBy==='likes')
            result = result.sort('-likes createdAt');
        else
            result = result.sort('createdAt');
    }

    //Pagination
    const page=req.query.page||1;
    const limit = req.query.limit||10;
    const skip = (page-1)*limit;

    result.skip(skip).limit(limit);

    const totalNotes = await Note.countDocuments(queryObject);
    const numOfPages = Math.ceil(totalNotes/limit);

    const notes = await result;
    res.status(StatusCodes.OK).json({notes,totalNotes,numOfPages});
}

// user can access it's own private notes
const getSingleNote = async(req,res)=>{
    const {id:noteId} = req.params;
    const note = await Note.findOne({_id:noteId}).populate('comments').populate({
        path:'likedBy',select : 'name image'}).populate({path : 'user' ,select : 'name image createdAt about numOfFollowers'}).populate({
            path : 'sharedWith',
            select : '_id email'
        });
    if(!note){
        throw new CustomError.notFoundError(`No note with id: ${noteId}`);
    }

    // console.log(req.signedCookies);
    let token;
    if(req.signedCookies.accessToken){
        token = isTokenValid(req.signedCookies.accessToken);    
    }    
    // console.log(token);
    if(note.visibility === 'private' )
    {
        if(!token){
            throw new CustomError.UnauthorizedError('You are not authorized to view this note');
        }

        const sharedWithexists = note.sharedWith.some(obj => obj.id === token.user.userId);
        if(!sharedWithexists && note.user._id.toString()!==token.user.userId){
            throw new CustomError.UnauthorizedError('You are not authorized to view this note');
        }
    }

    res.status(StatusCodes.OK).json({note}); 
}

//title,description,content,user,tags,visibility,likes
//frontend send me the complete tags array
const updateNote = async(req,res)=>{
    const{id:noteId} = req.params;
    const {title,description,content,tags,visibility,category}=req.body;
    console.log(tags);
    const note = await Note.findOne({_id:noteId});
    if(!note){
        throw new CustomError.notFoundError(`No note with id: ${noteId}`);
    }

    if(note.user.toString()!==req.user.userId){
        throw new CustomError.UnauthorizedError('You are not authorized to update this note');
    }

    if(tags){
        note.tags=tags;// findOneAndUpdate mein tags update krne pe error de rha tha tags undefined dikha rha tha
        await note.save();
    }

    const updatedNote = await Note.findOneAndUpdate({_id:noteId},{title,description,content,visibility,category},{new:true,runValidators:true});
    // console.log(updatedNote.tags);

    res.status(StatusCodes.OK).json({note : updatedNote});
}

const deleteNote = async(req,res)=>{
    const{id:noteId}=req.params;
    const note = await Note.findOne({_id:noteId});
    if(!note){
        throw new CustomError.notFoundError(`No note with id: ${noteId}`);
    }
    checkPermissions(req.user,note.user);
    await note.remove();
    res.status(StatusCodes.OK).json({msg:'Note deleted successfully'});
}

// kis kis ne like kiya vo bhi to aayega model mein
const likeNote = async(req,res)=>{
    const {id:noteId} = req.params;
    const note = await Note.findOne({_id:noteId});
    const user = await User.findOne({_id:req.user.userId});

    if(!note){
        throw new CustomError.notFoundError(`No note found with id : ${noteId}`);
    }

    if(note.visibility !== 'public'){
        throw new CustomError.BadRequestError(`You can't like a ${note.visibility} note`)
    }

    if(note.likedBy.includes(req.user.userId)){
        throw new CustomError.BadRequestError('You have already liked this note');
    }

    note.likes = note.likes+1;
    note.likedBy.push(req.user.userId); // user ke likes update krne ke liye and list ke liye pipeline -> no

    user.numOfLikes=user.numOfLikes+1;
    user.likes.push(noteId);

    // for ex. in E-commerece-API I had productReview instead of like, in which I asked multiple things, so I had to create a different model for review and then update the ratings, and all realtime, but here is's just a like so to update the likes for the user here only
    await note.save();
    await user.save();

    res.status(StatusCodes.OK).json({msg:"Liked succesfully!!"});
}

// can't send the unlike request if already not liked
const unlikeNote = async(req,res)=>
{
    const {id:noteId} = req.params;
    const note = await Note.findOne({_id:noteId});
    const user = await User.findOne({_id:req.user.userId});

    if(!note){
        throw new CustomError.notFoundError(`No note found with id : ${noteId}`);
    }

    if(!(note.visibility === 'public')){
        throw new CustomError.BadRequestError(`You can't unlike a ${note.visibility} note`);
    }

    if(!note.likedBy.includes(req.user.userId)){
        throw new CustomError.BadRequestError(`You have not liked this note`);
    }

    note.likes=note.likes-1;
    note.likedBy=note.likedBy.filter((id)=>id.toString()!==req.user.userId); // removing specific element from array

    user.numOfLikes=user.numOfLikes-1;
    user.likes= user.likes.filter((id)=>id.toString()!==noteId);

    await note.save();
    await user.save();

    res.status(StatusCodes.OK).json({msg:"Unliked succesfully!!"});
}

const generateSummary = async(req,res)=>{
    const {id:noteId} = req.params;
    
    const note = await Note.findOne({_id:noteId});
    if(!note){
        throw new CustomError.notFoundError(`No note exists with noteId : ${noteId}`);
    }

    // everyone should be able to generate summary for public notes
    // if(note.visibility!== 'public'){
    //     throw new CustomError.BadRequestError(`You can't generate summary for a ${note.visibility} note`);
    // }
    
    try {
        console.log(note.id);
        const summary = await summarizer(note);
        res.status(StatusCodes.OK).json({summary});
    } catch (error) {
        console.log(error);
        throw new CustomError.BadRequestError('Failed to generate summary');
    } 
}

const shareNote = async(req,res)=>{
    // category,tags,description
    const {id:noteId} = req.params;
    const {email}=req.body;
    const note = await Note.findOne({_id:noteId});
    if(!note){
        throw new CustomError.notFoundError(`No note exists with id : ${noteId}`);
    }

    // handle differently for public and private
    if(!note.category || !note.tags || !note.description){
        throw new CustomError.BadRequestError("Category, tags and description are required to share a note");
    }
    
    if(note.visibility!=='private'){
        throw new CustomError.BadRequestError(`Can use this only for private notes`);
    }

    let shared = [];
    //async await doesn't work in forEach loop

    // await email.forEach(async(email) => {
    //     let user = await User.findOne({email});
    //     if(note.sharedWith.includes(user._id)){
    //         console.log(`Note already shared with ${email}`);
    //         return;
    //     }
    //     if(!user){
    //         console.log(`No user exists with email : ${email}`);
    //         return;
    //         // throw new CustomError.notFoundError(`No user exists with email : ${email}`);
    //     }
    //     console.log(user._id);
    //     shared = [...shared,user._id];
    //     console.log(shared);
    //     link=`${process.env.FRONTEND_URL}/blog/${note._id}`
    //     // send email to the user
    //     html = `
    //         <h3> ${req.user.name} shared a private note with you</h3>
    //         <p>Title : ${note.title}</p>
    //         <p>Category : ${note.category}</p>
    //         <p>Description : ${note.description}</p>
    //         <p> Here is a link to it : ${link}
    //     `
    //     await sendEmail({to:`${email}`,subject : `Pen and Pixel Note Sharing`,html});
        
    // });

    for (const userEmail of email) {
        const user = await User.findOne({ email: userEmail });
    
        if (!user) {
            console.log(`No user exists with email: ${userEmail}`);
            continue; // Move to the next email
        }

        if (note.sharedWith.includes(user._id)) {
            console.log(`Note already shared with ${userEmail}`);
            continue; // Move to the next email
        }

        shared = [...shared,user._id];
        user.sharedNotes.push(note._id);
        await user.save();
        const origin = process.env.FRONTEND_URL || 'http://localhost:5000';
        const link = `${origin}/blog/${note._id}`;
        const html = `
            <h3>${req.user.name} shared a private note with you</h3>
            <p>Title: ${note.title}</p>
            <p>Category: ${note.category}</p>
            <p>Description: ${note.description}</p>
            <p>Here is a link to it: ${link}</p>
        `;

        await sendEmail({ to: userEmail, subject: `Pen and Pixel Note Sharing`, html });
    }

    note.sharedWith = [...note.sharedWith,...shared];
    await note.save();

    res.status(StatusCodes.OK).json({msg : "Note succesfully shared with the user"});
}

module.exports = {getAllNotes,getSingleNote,createNote,updateNote,deleteNote,likeNote,unlikeNote,generateSummary,shareNote};