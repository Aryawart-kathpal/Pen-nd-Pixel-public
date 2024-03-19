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
        required:[true,'Please provide description'],   
        maxlength:[200,'Description cannot be more than 200 characters'],
        minlength:[10,'Description cannot be less than 10 characters'],
    },
    content:{
        type:String,//HTML?
        required:[true,"Content can't be empty"],
        // should I add minlength or maxlength
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,'Provide the userlinked to it'],
    },
    category:{
        type:String,
        required:[true,'Please provide category'],
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
        required:[true,"Provide at least one tag"],
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
},{timestamps:true});

module.exports = mongoose.model('Note',noteSchema);