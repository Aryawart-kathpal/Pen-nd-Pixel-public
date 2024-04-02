const express=require('express');
const router = express.Router();

const {authorizePermissions,authenticateUser}=require('../middleware/authentication');
const{getAllUsers,getSingleUser,getCurrentUser,updateUser,deleteUser,updateUserPassword,contactUs}=require('../controllers/userController');

router.route('/').get([authenticateUser,authorizePermissions('admin')],getAllUsers);
router.route('/current').get(authenticateUser,getCurrentUser);
router.route('/update').patch(authenticateUser,updateUser);// only same user
router.route('/update-password').patch(authenticateUser,updateUserPassword);// only the logged in user can change it's own password
router.route('/delete/:id').delete(authenticateUser,deleteUser);// only admin and same user -> checkPermissions
router.route('/:id').get(authenticateUser,getSingleUser);// anyone can get ohter user to view their dashboard

module.exports=router;