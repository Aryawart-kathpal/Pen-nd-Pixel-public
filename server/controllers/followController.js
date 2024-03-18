const User=require('../models/User');
const CustomError = require('../errors');
const {StatusCodes} = require('http-status-codes');

const followUser = async(req,res)=>{// User can't follow or unfollow himself
    const {id} = req.params;
    const currUser = await User.findOne({_id:req.user.userId});
    const user = await User.findOne({_id:id});
    if(!user){
        throw new CustomError.notFoundError(`No user exists with id : ${id}`);
    }

    if(id===req.user.userId){
        throw new CustomError.BadRequestError("You can't follow or unfollow yourself");
    }

    if(currUser.following.includes(id)){
        throw new CustomError.BadRequestError("You are already following this user");
    }

    currUser.following.push(id);    
    user.followers.push(req.user.userId);
    currUser.numOfFollowing+=1;
    user.numOfFollowers+=1;
    
    await currUser.save();
    await user.save();
    res.status(StatusCodes.OK).json({msg:"Successfully followed the user"});
}

const unfollowUser = async(req,res)=>{
    const {id} = req.params;
    const currUser = await User.findOne({_id:req.user.userId});
    const user = await User.findOne({_id:id});  
    if(!user){
        throw new CustomError.notFoundError(`No user exists with id : ${id}`);
    }

    if(id===req.user.userId){
        throw new CustomError.BadRequestError("You can't follow or unfollow yourself");
    }

    if(!currUser.following.includes(id)){
        throw new CustomError.BadRequestError("You are not following this user");
    }

    const index = currUser.following.indexOf(id);   
    currUser.following.splice(index,1);

    const index2 = user.followers.indexOf(req.user.userId);
    user.followers.splice(index2,1);

    currUser.numOfFollowing-=1;
    user.numOfFollowers-=1;

    await currUser.save();
    await user.save();

    res.status(StatusCodes.OK).json({msg:"Successfully unfollowed the user"});
}

const getFollowers = async(req,res)=>{
    const {id} = req.params;
    const user = await User.findOne({_id:id});
    if(!user){
        throw new CustomError.notFoundError(`No user exists with id : ${id}`);
    }
    res.status(StatusCodes.OK).json({followers:user.followers,numOfFollowers:user.numOfFollowers});
}

const getFollowing = async(req,res)=>{
    const{id} = req.params;
    const user = await User.findOne({_id:id});
    if(!user){
        throw new CustomError.notFoundError(`No user exists with id : ${id}`);
    }
    res.status(StatusCodes.OK).json({following:user.following,numOfFollowing:user.numOfFollowing});
}   

module.exports={followUser,unfollowUser,getFollowers,getFollowing};