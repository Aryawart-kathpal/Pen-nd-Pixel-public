const Note = require('../models/Note');
const {CustomError} = require('../errors');
const {StatusCodes} = require('http-status-codes');
const {checkPermissions} = require('../utils');

//title,description,content,user,tags,visibility,likes
const createNote = async(req,res)=>{
    const {tags}= req.body;
    if(!tags){
        throw new CustomError.BadRequestError('Please provide at least one tag');
    }
    req.body.user = req.user.userId;

    const note = await Note.create(req.body);// only the required things will go in the database, others will be ignored if added
    res.status(StatusCodes.CREATED).json({note});
}

const getAllNotes= async(req,res)=>{// adding searches and filters here also, sort based on createdAt
    /*const notes = await Note.find({}).sort('createdAt').populate('user','name');
    res.status(StatusCodes.OK).json({notes});*/
    const notes = await Note.find({visibility:'public'});
    res.status(StatusCodes.OK).json({notes,count:notes.length});
}

// user can access it's own private notes
const getSingleNote = async(req,res)=>{
    const {id:noteId} = req.params;
    const note = await Note.findOne({_id:noteId});
    if(!note){
        throw new CustomError.NotFoundError(`No note with id: ${noteId}`);
    }

    if((note.visibility==='private' || note.visibility==='unlisted')){
        throw new CustomError.UnauthorizedError('You are not authorized to access this note');
    }

    res.status(StatusCodes.OK).json({note}); 
}

//title,description,content,user,tags,visibility,likes
//frontend send me the complete tags array
const updateNote = async(req,res)=>{
    const{id:noteId} = req.params;
    const {title,description,content,tags,visibility}=req.body;
    // console.log(tags);
    const note = await Note.findOne({_id:noteId});
    if(!note){
        throw new CustomError.NotFoundError(`No note with id: ${noteId}`);
    }

    if(note.user.toString()!==req.user.userId){
        throw new CustomError.UnauthorizedError('You are not authorized to update this note');
    }

    if(tags){
        note.tags=tags;// findOneAndUpdate mein tags update krne pe error de rha tha tags undefined dikha rha tha
        await note.save();
    }

    const updatedNote = await Note.findOneAndUpdate({_id:noteId},{title,description,content,visibility},{new:true,runValidators:true});
    // console.log(updatedNote.tags);

    res.status(StatusCodes.OK).json({updatedNote});
}

const deleteNote = async(req,res)=>{
    const{id:noteId}=req.params;
    const note = await Note.findOne({_id:noteId});
    if(!note){
        throw new CustomError.NotFoundError(`No note with id: ${noteId}`);
    }
    checkPermissions(req.user,note.user);
    await note.remove();
    res.status(StatusCodes.OK).json({msg:'Note deleted successfully'});
}

// getAllNotes getSingleNote createNote updateNote deleteNote
//Add Likes Controller

module.exports = {getAllNotes,getSingleNote,createNote,updateNote,deleteNote};