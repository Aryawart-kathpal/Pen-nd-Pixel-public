const express = require('express');
const router = express.Router();

const {authenticateUser}=require('../middleware/authentication');
const{getSingleComment,createComment,getCommentForSingleNote,updateComment,deleteComment}= require('../controllers/commentController');

// app.js mein /:noteId route bnaane se req.params mein nhi aa rha tha noteId, but yahan commentRoutes mein /:noteId daalne se aa rha hai req.params mein noteId
router.route('/:noteId/comments').post(authenticateUser,createComment).get(getCommentForSingleNote);
router.route('/:noteId/comments/:commentId').get(getSingleComment).patch(authenticateUser,updateComment).delete(authenticateUser,deleteComment);

module.exports=router;