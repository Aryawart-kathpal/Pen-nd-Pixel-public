// getAllNotes getSingleNote createNote updateNote deleteNote

//title,description,content,user,tags,visibility,likes
const createNote = async(req,res)=>{
    res.send('Create Note');
}

const getAllNotes= async(req,res)=>{// adding searches and filters here also
    res.send('Get All Notes');
}

const getSingleNote = async(req,res)=>{
    res.send('Get Single Note');
}

const updateNote = async(req,res)=>{
    res.send('Update Note');
}

const deleteNote = async(req,res)=>{
    res.send('Delete Note');
}

module.exports = {getAllNotes,getSingleNote,createNote,updateNote,deleteNote};