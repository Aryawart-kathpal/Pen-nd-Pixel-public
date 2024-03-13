const express=require('express');
const router = express.Router();

const {authenticateUser,authorizePermissions}=require('../middleware/authentication');
const {followUser,unfollowUser,getFollowers,getFollowing}=require('../controllers/followController');

router.route('/follow/:id').post(authenticateUser,followUser);// khud ko follow nhi kr skta
router.route('/unfollow/:id').delete(authenticateUser,unfollowUser);// khud ko unfollow nhi kr skta
router.route('/followers/:id').get(authenticateUser,getFollowers);
router.route('/following/:id').get(authenticateUser,getFollowing);

module.exports=router;