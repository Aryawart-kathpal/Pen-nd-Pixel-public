const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Title is required'],
        maxlength:[40,'Title cannot be more than 40 characters'],
        minlength:[5,'Title cannot be less than 5 characters'],
    },
    description:{
        type:String,
        // required:[true,'Please provide description'],   
        maxlength:[200,'Description cannot be more than 200 characters'],
        minlength:[10,'Description cannot be less than 10 characters'],
    },
    content:{
        type:String,//HTML?
        // required:[true,"Content can't be empty"],
        // should I add minlength or maxlength
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,'Provide the userlinked to it'],
    },
    category:{
        type:String,
        // required:[true,'Please provide category'],
        enum:{
            values:['tech','travel','food','music','movies','books','disaster','personal','work','study','ideas','innovation','journal','recipes','health','finance','fitness','fashion','lifestyle','sports','politics','science','history','art','culture','education','environment','religion','philosophy','psychology','self-help','spirituality','technology','movies','quotes','other'],
            message:'{VALUE} is not supported category',
        },
    },
    tags:{
        type:[String],
        validate:{
            validator:function(){
                return this.tags.length<=7;
            },
            message:'Tags cannot be more than 7',
        },
        // required:[true,"Provide at least one tag"],
    },
    visibility:{
        type:String,
        enum:{
            values:['public','private','unlisted'],
            message:'{VALUE} is not supported visibility type',
        },
        default:'private',
    },
    likes:{
        type:Number,
        default:0
    },
    likedBy:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'User',
    },
    sharedWith : {
        type:[mongoose.Schema.Types.ObjectId],
        ref:'User',
    },
},{timestamps:true ,toJSON : {virtuals:true}, toObject : {virtuals:true}});

noteSchema.virtual('comments',{
    ref:'Comment',
    localField : '_id',
    foreignField : 'note',
    justOne:false,
});

noteSchema.virtual('likedby',{
    ref:'User',
    localField:'likedBy',
    foreignField:'_id',
    justOne:false,
});

noteSchema.methods.calculateLikes = async function (userId){
    const stats = await this.aggregate([
        {match:{user:userId}},
        {
            group:{
                _id:'$user',
                numOfLikes:{$sum:'$likes'},
            }
        }
    ])
    console.log(stats);
    return stats;
}// not using

noteSchema.pre('remove',async function(next){
    console.log("Inside note remove");
    await this.likedBy.forEach(async(userId)=>{
        const user = await this.model('User').findOne({_id:userId});
        user.likes= user.likes.filter((noteId)=>noteId.toString()!==this._id.toString());
        user.numOfLikes=user.numOfLikes-1;
        await user.save();
    })
    await this.model('Comment').deleteMany({note:this._id});
    console.log("finished note remove");
    next();
})

module.exports = mongoose.model('Note',noteSchema);