const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');


const getAllUsers = async(req,res)=>{
    const users= await User.find({});
    res.status(StatusCodes.OK).json({users,count:users.length});
}

const getSingleUser = async(req,res)=>{
    const {id}=req.params;
    const user = await User.findOne({_id:id});
    res.status(StatusCodes.OK).json({user});
}   

const getCurrentUser = async(req,res)=>{
    const {userId} = req.user;
    const user = await User.findOne({_id:userId});
    // later also have to give some more data including notes and may be setting pipeline too..

    res.status(StatusCodes.OK).json({user});
}

const updateUser = async(req,res)=>{
    // name,email and image only
    const {name,email,password} = req.body;

}

const deleteUser = async(req,res)=>{
    res.send("Delete user");
}

const updateUserPassword = async(req,res)=>{
    res.send("Update user password");
}
module.exports={getAllUsers,getSingleUser,getCurrentUser,updateUser,deleteUser,updateUserPassword};
// getAllUsers getSingleUser getCurrentUser(along with notes adding at later stage) updateUser deletUser updateUserPassword