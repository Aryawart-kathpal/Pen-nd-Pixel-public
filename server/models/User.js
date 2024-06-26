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
        // required:[true,'Please add about me'],
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
    numOfLikes:{
        type:Number,
        default:0,
    },
    likes:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Note',
    },
    sharedNotes : {
        type: [mongoose.Schema.ObjectId],
        ref:'Note',
    }
},{timestamps:true ,toJSON : {virtuals:true}, toObject : {virtuals:true}});

userSchema.virtual('Followers',{
    ref:'User',
    localField:'followers',
    foreignField:'_id',
    justOne:false,
})// not working

userSchema.pre('save',async function(){
    const salt = await bcrypt.genSalt(10);
    if(!this.isModified('password')) return;
    this.password= await bcrypt.hash(this.password,salt);
})

userSchema.pre('remove',async function(){
    // console.log("Inside user remove");
    const notes = await this.model('Note').find({user:this._id});
    // console.log("Initiating note remove");
    notes.forEach(async(note)=>{
        const Note = await this.model('Note').findOne({_id:note._id});
        await Note.remove();
    })
    // console.log("note remove completed");
    await this.model('Comment').deleteMany({user:this._id}); 
    // likes,remove,followers,following remove , likes array mein saare notes pe ek like reduce krna hai, and likedBy array mein se bhi remove krna hai
    // console.log("Comments deleted");

    await this.likes.forEach(async(noteId)=>{
        const NOTE = await this.model('Note').findOne({_id:noteId});
        NOTE.likes=NOTE.likes-1;
        NOTE.likedBy=NOTE.likedBy.filter((id)=>id.toString()!==this._id.toString());
        await NOTE.save();
    });
    // console.log("Likes removed");
    await this.followers.forEach(async(followerId)=>{
        const Follower = await this.model('User').findOne({_id:followerId});
        Follower.numOfFollowing=Follower.numOfFollowing-1;
        Follower.following=Follower.following.filter((id)=>id.toString()!==this._id.toString());
        await Follower.save();
    });
    // console.log("Followers removed");
    await this.following.forEach(async(followingId)=>{
        const Following = await this.model('User').findOne({_id:followingId});
        Following.numOfFollowers=Following.numOfFollowers-1;
        Following.followers=Following.followers.filter((id)=>id.toString()!==this._id.toString());
        await Following.save();
    });
    // console.log("Following removed");
    // console.log("User remove completed");
})

userSchema.methods.comparePassword= async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword,this.password);
    return isMatch;
}

module.exports= mongoose.model('User',userSchema);
// if user has liked his own note or like that