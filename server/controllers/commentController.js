const mongoose = require('mongoose');
const Comment = require('../models/Comment');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');
const {checkPermissions}= require('../utils');
const Note= require('../models/Note');

const createComment = async(req,res)=>{ 
    const {noteId} = req.params; 
    const {comment} = req.body;
    // console.log(noteId);
    const note = await Note.findOne({_id:noteId});
    if(!note){
        throw new CustomError.BadRequestError(`No note exists with id : ${noteId}`);
    }
    req.body.user = req.user.userId;
    req.body.note = noteId; //  this.split path error if creates mongoose.schema.objid -> typecast
    req.body.name = req.user.name;

    const newComment = await Comment.create(req.body);

    res.status(StatusCodes.CREATED).json({newComment});
}   

const getSingleComment = async(req,res)=>{
    const {commentId,noteId} = req.params;
    
    const comment = await Comment.findOne({_id:commentId,note:noteId});
    if(!comment){
        throw new CustomError.notFoundError(`No comment found with id : ${commentId} and noteId : ${noteId}`);
    }

    res.status(StatusCodes.OK).json({comment});
}

const getCommentForSingleNote = async(req,res)=>{
    const {noteId} = req.params;
    const note = await Note.findOne({_id:noteId});
    if(!note){
        throw new CustomError.BadRequestError(`No note exists with id : ${noteId}`);
    }

    const comments = await Comment.find({note:noteId}).select('name user comment');
    res.status(StatusCodes.OK).json({comments,count:comments.length});
}

const updateComment = async(req,res)=>{
    const {comment} = req.body;
    const {commentId,noteId} = req.params;
    
    const note =await Note.findOne({_id:noteId});
    if(!note){
        throw new CustomError.BadRequestError(`No note exists with id : ${noteId}`);
    }
    
    const newComment = await Comment.findOne({_id:commentId,note:noteId});
    if(!newComment){
        throw new CustomError.BadRequestError(`No comment found with id : ${commentId} and noteId : ${noteId}`)
    }
    checkPermissions(req.user,newComment.user);// can be updated by same user or the admin
    
    newComment.comment=comment;
    await newComment.save();

    res.status(StatusCodes.OK).json({msg:"Comment successfully updated",comment : newComment});   
}

const deleteComment = async(req,res)=>{
    const {noteId,commentId}=req.params;

    const note =await Note.findOne({_id:noteId});
    if(!note){
        throw new CustomError.BadRequestError(`No note exists with id : ${noteId}`);
    }

    const comment = await Comment.findOne({_id:commentId,note:noteId});
    if(!comment){
        throw new CustomError.notFoundError(`No comment found with id : ${commentId} on ${noteId}`);
    }
    checkPermissions(req.user,comment.user);// can be updated by same user or the admin

    await comment.remove();
    res.status(StatusCodes.OK).json({msg:"Comment successfully deleted"});
}

module.exports = {
    getSingleComment,
    createComment,
    getCommentForSingleNote,
    updateComment,
    deleteComment
}