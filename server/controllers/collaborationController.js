const Note = require('../models/Note');
const {io} = require('../app');
const CustomError = require('../errors');
const {StatusCodes} = require('http-status-codes');

io.on('connection',(socket)=>{
    console.log(`Socket ${socket.id} connected`);

    socket.on('editNote',async(req,res)=>{
        console.log(`Received request for note edit`);
        const response = await noteEdit(req,res);

        socket.broadcast.emit('updateNote',{note:response.note});
    });

    socket.on('disconnect',()=>{
        console.log(`Socket ${socket.id} disconnected`);
    })
});

const noteEdit = async(req,res)=>{

    console.log(`Received request for note edit`);

    const{id:noteId} = req.params;
    const {title,description,content,tags,visibility,category}=req.body;

    const note = await Note.findOne({_id:noteId});
    if(!note){
        throw new CustomError.notFoundError(`No note with id: ${noteId}`);
    }

    if(note.user.toString()!==req.user.userId){
        if(!note.access.includes(req.user.userId)){
            throw new CustomError.BadRequestError(`You are not authorized to edit this note`);
        }
    }

    if(tags){
        note.tags=tags;// findOneAndUpdate mein tags update krne pe error de rha tha tags undefined dikha rha tha
        await note.save();
    }

    const updatedNote = await Note.findOneAndUpdate({_id:noteId},{title,description,content,visibility,category},{new:true,runValidators:true});

    io.emit('editNote',{noteId,updatedNote});
    return res.status(StatusCodes.OK).json({note:updatedNote,msg:'Note updated!!'});
}

module.exports ={noteEdit};