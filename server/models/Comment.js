const mongoose = require('mongoose');
// edit comment
// name add kr diya hai schema mein, but anyways user aur note puura alag se bhi linked hain
// separate comment controller to be made
// body se manngunga note ki id
// user ke total likes ke liye ban skti hai pipeline
// jiska comment create ho rha uski id req.body mein maang rha
// getSingleProductReviews note routes mein daal dunga baad m.. 
// baad mein figure out karunga about the other routes of comments 
const commentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide name'],
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,'Please provide user'],
    },
    note:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Note',
        required:[true,'Please provide note'],
    },
    comment:{
        type:String,
        required:[true,"Comment can't be empty"],
        maxlength:[400,'Comment cannot be more than 400 characters'],
        minlength:[5,'Comment cannot be less than 5 characters'],
    }
},{timestamps:true});

commentSchema.index({user:1,note:1},{unique:true});

module.exports=mongoose.model('Comment',commentSchema);