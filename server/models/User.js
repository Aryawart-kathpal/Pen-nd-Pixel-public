const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide name'],
        maxlength:30,
    },
    email:{
        type:String,
        required:[true,'Please provide email'],
        unique:true,
        validate:{
            validator:validator.isEmail,
            message:'Please provide valid email',
        }
    },
    password:{
        type:String,
        minlength:[8,'Password should be greater than or equal to 8 characters'],
        required:[true,'Please provide password'],
    },
    role:{
        type:String,
        required:[true,'Please provide role'],
        enum:['user','admin'],
        default:'user',
    },
    image:{
        type:String,
        default:'https://www.gravatar.com/avatar/000?d=mp',
    },
    about:{
        type:String,
        maxlength:[500,"About can't be more than 500 characters"],
        minlength:[10,"About can't be less than 10 characters"]
    },
    numOfFollowers:{
        type:Number,
        default:0,
    },
    numOfFollowing:{
        type:Number,
        default:0,
    },
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }],
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }],
    verificationToken:String,
    isVerified:{
        type:Boolean,
        default:false,
    },
    verified:Date,
    passwordToken :{
        type:String,
    },
    passwordTokenExpirationDate:{
        type:Date,
    },
},{timestamps:true});

userSchema.pre('save',async function(){
    const salt = await bcrypt.genSalt(10);
    if(!this.isModified('password')) return;
    this.password= await bcrypt.hash(this.password,salt);
})

userSchema.methods.comparePassword= async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword,this.password);
    return isMatch;
}

module.exports= mongoose.model('User',userSchema);