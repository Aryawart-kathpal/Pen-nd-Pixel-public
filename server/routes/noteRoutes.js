const express = require('express');
const router = express.Router();

const{authenticateUser,authorizePermissions}=require('../middleware/authentication');
const {getAllNotes,getSingleNote,createNote,deleteNote,updateNote,likeNote,unlikeNote}= require('../controllers/noteController');

router.route('/').get(getAllNotes);
router.route('/create').post(authenticateUser,createNote);
router.route('/update/:id').patch(authenticateUser,updateNote);// issi bande ka note hona chahiye bs
router.route('/delete/:id').delete(authenticateUser,deleteNote);//checkPermissions
router.route('/like/:id').post(authenticateUser,likeNote);
router.route('/unlike/:id').delete(authenticateUser,unlikeNote);
router.route('/:id').get(getSingleNote);

module.exports=router;