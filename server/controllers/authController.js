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

const login = async(req,res)=>{
    res.send("Login route");
}

const verifyEmail = async(req,res)=>{
    res.send("Verify Email route");
}

const logout = async(req,res)=>{
    res.send("Logout route");
}        

const forgotPassword = async(req,res)=>{
    res.send("Forgot Password route");
}   

const resetPassword = async(req,res)=>{
    res.send("Reset Password route");
}

module.exports={register,login,verifyEmail,logout,forgotPassword,resetPassword};