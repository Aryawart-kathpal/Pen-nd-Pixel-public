require('dotenv').config();
const User = require('../models/User');
const {StatusCodes}=require('http-status-codes');
const CustomError = require('../errors');
const Token=require('../models/Token');
const crypto = require('crypto');
const {attachCookiesToResponse,sendResetPasswordEmail,sendVerificationEmail,createTokenUser,createHash} = require('../utils');

const register = async(req,res)=>{
    const {name,email,password,image} = req.body;

    const emailAlreadyExists = await User.findOne({email});
    if(emailAlreadyExists){
        throw new CustomError.BadRequestError(`Email ${email} already exists`);
    }

    const verificationToken = crypto.randomBytes(40).toString('hex');
    const user = await User.create({name,email,password,image,verificationToken});

    const origin = 'http://localhost:5000';
    await sendVerificationEmail({name,email,verificationToken,origin});

    res.status(StatusCodes.CREATED).json({msg : 'Success, Email sent for verification'});
}

const login= async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        throw new CustomError.BadRequestError('Please provide email and password');
    }
    const user = await User.findOne({email});
    if(!user){
        throw new CustomError.UnauthenticatedError(`No user exists with email : ${email}`);
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
        throw new CustomError.UnauthenticatedError('Incorrect password entered');
    }

    if(!user.isVerified){
        throw new CustomError.UnauthenticatedError('Please verify your email');
    }

    const tokenUser=createTokenUser(user);

    let refreshToken='';
    const existingToken=await Token.findOne({user:user._id});
    if(existingToken){
        const {isValid}=existingToken;
        // If the user is doing something that I strictly doesn't want him to do, somehow I can make isValid to false and throw the following error and ensure that the user will not be able to loginn again
        if(!isValid){
            throw new CustomError.UnauthenticatedError('Invalid Credentials');
        }
        refreshToken=existingToken.refreshToken;
        attachCookiesToResponse({res,user:tokenUser,refreshToken});
        return res.status(StatusCodes.OK).json({user:tokenUser});
    }

    // what is the use of ip and userAgent
    refreshToken=crypto.randomBytes(40).toString('hex');
    const userAgent=req.headers['user-agent'];
    const ip=req.ip;
    const userToken={refreshToken,ip,userAgent,user:user._id};

    await Token.create(userToken);
    attachCookiesToResponse({res,user:tokenUser,refreshToken});
    res.status(StatusCodes.OK).json({user:tokenUser});
}

const verifyEmail = async(req,res)=>{
    const {token,email}=req.query;

    const user = await User.findOne({email});
    if(!user){
        throw new CustomError.UnauthenticatedError("Verification Failed, user not found");
    }
    
    if(user.verificationToken!==token){
        throw new CustomError.UnauthenticatedError('Verification Failed, token invalid');
    }

    user.isVerified=true;
    user.verified=Date.now();
    user.verificationToken='';

    await user.save();
    res.status(StatusCodes.OK).json({msg:'Email verified'});
}

const logout = async(req,res)=>{
    await Token.findOneAndDelete({user:req.user.userId});

    res.cookie('accessToken','logout',{
        httpOnly:true,
        expires : new Date(Date.now()),
    })

    res.cookie('refreshToken','logout',{
        httpOnly:true,
        expires : new Date(Date.now()),
    })
    res.status(StatusCodes.OK).json({msg:"user logged out"});
}   

const forgotPassword= async(req,res)=>{
    const{email}=req.body;
    if(!email){
        throw new CustomError.BadRequestError('Please provide email');
    }
    const user=await User.findOne({email});

    if(user){
        const passwordToken = crypto.randomBytes(70).toString('hex');
        const origin = 'http://localhost:5000';
        await sendResetPasswordEmail({name:user.name,email:user.email,token:passwordToken,origin});
        
        const tenMinutes= 10*60*1000;
        const passwordTokenExpirationDate = new Date(Date.now()+tenMinutes);
        
        user.passwordToken = createHash(passwordToken);
        user.passwordTokenExpirationDate=passwordTokenExpirationDate;
        await user.save();
    }
    res.status(StatusCodes.OK).json({msg:"Please check email for verification link"});
}

const resetPassword = async(req,res)=>{
    const {email,token} = req.query;
    const {password}=req.body;

    if(!email || !token || !password){
        throw new CustomError.BadRequestError('Please provide all values');
    }

    const user = await User.findOne({email});
    if(user){
        const currentDate= new Date();
        if(user.passwordToken===createHash(token) && user.passwordTokenExpirationDate > currentDate){
            user.password=password;
            user.passwordToken=null;
            user.passwordTokenExpirationDate=null;
            await user.save();
        }
    }
    res.status(StatusCodes.OK).json({msg:"Succesfull password reset"});
}

module.exports={register,login,verifyEmail,logout,forgotPassword,resetPassword};