const CustomError = require('../errors');
const {isTokenValid, attachCookiesToResponse}= require('../utils');
const Token = require('../models/Token');

const authenticateUser = async(req,res,next)=>{
    const {refreshToken,accessToken} =req.signedCookies;
    try {
        if(accessToken){// access Token exists mein that it is valid, as it's existing check is made in the controller only
            const payload = isTokenValid(accessToken);
            req.user=payload.user;
            return next();
        }
        const payload = isTokenValid(refreshToken);
        
        const existingToken = await Token.findOne({
            user:payload.user.userId,
            refreshToken:payload.refreshToken,
        });
        
        if(!existingToken || !existingToken?.isValid){
            throw new CustomError.UnauthenticatedError('Authentication Invalid');
        }
        // console.log("hello");
        attachCookiesToResponse({res,user:payload.user,refreshToken:payload.refreshToken});
        
        req.user=payload.user;
        // next(); -> had to remove this as in shareNote private it was giving error next() not defined
    } catch (error) {
        console.log(error);
        throw new CustomError.UnauthenticatedError("Authentication Invalid");
    }
}

const authorizePermissions = (...roles)=>{
    return (req,res,next)=>{//req,res,next makes a middleware so it has not not be passed in the calling function
        if(!roles.includes(req.user.role)){
            throw new CustomError.UnauthorizedError("Authorization invalid");
        }
        next();
    }
}

module.exports={authenticateUser,authorizePermissions};