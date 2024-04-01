const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');
const { checkPermissions } = require('../utils');
const cloudinary = require('cloudinary').v2;
const Note = require('../models/Note');
const mongoose = require('mongoose');

const getAllUsers = async(req,res)=>{
    const users= await User.find({}).select('-password');
    res.status(StatusCodes.OK).json({users,count:users.length});
}

const getSingleUser = async(req,res)=>{
    const {id}=req.params;
    const user = await User.findOne({_id:id}).select('-password');
    // followers aur following vgera bhi dena hai
    // currentUser jaisa kaafi kuch dena hai isko bhi
    res.status(StatusCodes.OK).json({user});
}   

const getCurrentUser = async(req,res)=>{
    const {userId} = req.user;
    const user = await User.findOne({_id:userId}).select('-password');
    // later also have to give some more data including notes and may be setting pipeline too.. -> done
    //name,image,about me of user ->done
    // About note :  title,description,name,content,status-> done
    // followers aur following vgera bhi dena hai ->done
    // background image->done

    // const notes=await Note.find({user:userId}).sort({createdAt:-1}).populate('user',['name','image']).populate('likedBy',['name','image']).populate('comments.user',['name','image']).populate('comments.replies.user',['name','image']).populate('comments.replies.replies.user',['name','image']);
    const notes=await Note.find({user:userId});

    const stats = await Note.aggregate([
        {$match:{user:mongoose.Types.ObjectId(userId)}},
        {
            $group:{
                _id:null,// '$user' -> error has match only for one user
                numOfLikes:{$sum:'$likes'},
            }
        }
    ])
    // console.log(stats[0].numOfLikes);
    const noteLikes= stats[0].numOfLikes;

    res.status(StatusCodes.OK).json({user,notes,numOfNotes:notes.length,noteLikes});
}

const updateUser = async(req,res)=>{
    // name,email and image only
    const {name,image,about} = req.body;
    if(!name && !image){
        throw new CustomError.BadRequestError("Please Update name or image");
    }

    const user = await User.findOne({_id:req.user.userId}).select('-password');

    if (image) {
        function getImagePublicId(cloudinaryUrl) {
            // Split the URL by '/'
            const parts = cloudinaryUrl.split('/');
            // Find the part that contains the public ID
            const publicIdPart = parts[parts.length - 1].split('.')[0];
            return publicIdPart;
        }
    
        // Example usage
        const cloudinaryUrl = user.image;
        const imagePublicId = getImagePublicId(cloudinaryUrl);
        console.log(imagePublicId); // Output: image_public_id
        const result = await cloudinary.uploader.destroy(imagePublicId)
            .then(result => {
                console.log('Deleted success:', result);
            })
            .catch(error => {
                console.error('Error deleting:', error);
            });
    
        await cloudinary.api.delete_resources([`Pen-and-Pixel/${imagePublicId}`], { type: 'upload', resource_type: 'image' })
            .then(result => {
                console.log('Deleted resources:', result);
            })
            .catch(error => {
                console.error('Error deleting resources:', error);
            });
    
        user.image = image;
    }
    if(name){
        user.name=name;
    }
    if(about){
        user.about=about;
    }
    await user.save();

    res.status(StatusCodes.OK).json({msg:"Successfully updated the user",user});
}

const deleteUser = async(req,res)=>{
    const{id} = req.params;  
    checkPermissions(req.user,id);
    const user = await User.findOne({_id:id});
    await user.remove(); // to delete the info at post remove hook, followers, updating lists of followers and following, rating,review,comments,etc.

    // Also deleting the notes of the user, ratings, comments,etc.
    res.status(StatusCodes.OK).json({msg:"Successfully deleted the user"});
}

const updateUserPassword = async(req,res)=>{
    const {userId} = req.user;
    const {oldPassword,newPassword} = req.body;

    if(!oldPassword || !newPassword){
        throw new CustomError.BadRequestError(`Please provide oldPassword and newPassword`);
    }

    if(oldPassword===newPassword){
        throw new CustomError.BadRequestError("New password can't be same as old password");
    }
    const user = await User.findOne({_id:userId});
    const isPasswordCorrect = await user.comparePassword(oldPassword);
    if(!isPasswordCorrect){
        throw new CustomError.UnauthenticatedError("Invalid Password");
    }
    user.password = newPassword;
    await user.save();
    res.status(StatusCodes.OK).json({msg:"Successfully updated the password"});
}
module.exports={getAllUsers,getSingleUser,getCurrentUser,updateUser,deleteUser,updateUserPassword};
// getAllUsers getSingleUser getCurrentUser(along with notes adding at later stage) updateUser deletUser updateUserPassword