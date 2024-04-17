require('dotenv').config();
const User = require('../models/User');
const {StatusCodes}=require('http-status-codes');
const CustomError = require('../errors');
const Token=require('../models/Token');
const crypto = require('crypto');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const {attachCookiesToResponse,sendResetPasswordEmail,sendVerificationEmail,createTokenUser,createHash} = require('../utils');

const register = async(req,res)=>{
    const {name,email,password,image,about} = req.body;
    console.log("HELLO");
    const emailAlreadyExists = await User.findOne({email});
    console.log(emailAlreadyExists);
    if(emailAlreadyExists){
        throw new CustomError.BadRequestError(`Email ${email} already exists`);
    }
    console.log("sajhv");
    const verificationToken = crypto.randomBytes(40).toString('hex');
    const user = await User.create({name,email,password,image,verificationToken,about});
    
    const origin = process.env.FRONTEND_URL || 'http://localhost:5000';
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
        throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }

    if(!user.isVerified){
        throw new CustomError.UnauthenticatedError('Please verify your email');
    }

    const tokenUser=createTokenUser(user);

    let refreshToken='';
    const existingToken=await Token.findOne({user:user._id});
    if(existingToken){
        const {isValid}=existingToken;
        if(!isValid){
            throw new CustomError.UnauthenticatedError('Invalid Credentials');
        }
        refreshToken=existingToken.refreshToken;
        attachCookiesToResponse({res,user:tokenUser,refreshToken});
        return res.status(StatusCodes.OK).json({user:tokenUser});
    }

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
        const origin = process.env.FRONTEND_URL || 'http://localhost:5000';
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

const uploadImage = async(req,res)=>{
    if(!req.files){
        throw new CustomError.BadRequestError('No file uploaded');
    }
    const productImage = req.files.image;
    
    if(!productImage.mimetype.startsWith('image')){
        throw new CustomError.BadRequestError('Please upload an image');
    }

    const maxSize = 1024*1024;
    if(productImage.size > maxSize){
        throw new CustomError.BadRequestError('Please upload an image of size less than 1MB');
    }
    
    const result = await cloudinary.uploader.upload(productImage.tempFilePath,{
        use_filename:true,
        folder:'Pen-and-Pixel',
    });
    fs.unlinkSync(productImage.tempFilePath);

    res.status(StatusCodes.OK).json({url:result.secure_url});
}

module.exports={register,login,verifyEmail,logout,forgotPassword,resetPassword,uploadImage};