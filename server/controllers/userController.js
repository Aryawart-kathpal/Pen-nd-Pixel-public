const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');
const cloudinary = require('cloudinary').v2;

const getAllUsers = async(req,res)=>{
    const users= await User.find({}).select('-password');
    res.status(StatusCodes.OK).json({users,count:users.length});
}

const getSingleUser = async(req,res)=>{
    const {id}=req.params;
    const user = await User.findOne({_id:id}).select('-password');
    res.status(StatusCodes.OK).json({user});
}   

const getCurrentUser = async(req,res)=>{
    const {userId} = req.user;
    const user = await User.findOne({_id:userId}).select('-password');
    // later also have to give some more data including notes and may be setting pipeline too..

    res.status(StatusCodes.OK).json({user});
}

const updateUser = async(req,res)=>{
    // name,email and image only
    const {name,email,image} = req.body;
    if(!name && !image){
        throw new CustomError.BadRequestError("Please Update name or image");
    }

    const user = await User.findOne({_id:req.user.userId});

    // Deletion creating issue
    /*if(image){

        function getImagePublicId(cloudinaryUrl) {
            // Split the URL by '/'
            const parts = cloudinaryUrl.split('/');
            // Find the part that contains the public ID
            const publicIdPart = parts[parts.length - 1].split('.')[0];
            return publicIdPart;
        }
        
        // Example usage
        const cloudinaryUrl = user.image;
        const imagePublicId = getImagePublicId(cloudinaryUrl);
        console.log(imagePublicId); // Output: image_public_id
        const result = await cloudinary.uploader.destroy(imagePublicId).then(console.log('Deleted success')).catch((error)=>console.log(error));

        await cloudinary.v2.delete_resources([`Pen-and-Pixel/${imagePublicId}`], { type: 'upload', resource_type: 'image' })
        .then(result => {
            console.log('Deleted resources:', result);
        })
        .catch(error => {
            console.error('Error deleting resources:', error);
        });

        user.image=image;
    }*/

    if (image) {
        function getImagePublicId(cloudinaryUrl) {
            // Split the URL by '/'
            const parts = cloudinaryUrl.split('/');
            // Find the part that contains the public ID
            const publicIdPart = parts[parts.length - 1].split('.')[0];
            return publicIdPart;
        }
    
        // Example usage
        const cloudinaryUrl = user.image;
        const imagePublicId = getImagePublicId(cloudinaryUrl);
        console.log(imagePublicId); // Output: image_public_id
        const result = await cloudinary.uploader.destroy(imagePublicId)
            .then(result => {
                console.log('Deleted success:', result);
            })
            .catch(error => {
                console.error('Error deleting:', error);
            });
    
        await cloudinary.api.delete_resources([`Pen-and-Pixel/${imagePublicId}`], { type: 'upload', resource_type: 'image' })
            .then(result => {
                console.log('Deleted resources:', result);
            })
            .catch(error => {
                console.error('Error deleting resources:', error);
            });
    
        user.image = image;
    }
    if(name){
        user.name=name;
    }
    await user.save();
    res.status(StatusCodes.OK).json({user});
}

const deleteUser = async(req,res)=>{
    res.send("Delete user");
}

const updateUserPassword = async(req,res)=>{
    res.send("Update user password");
}
module.exports={getAllUsers,getSingleUser,getCurrentUser,updateUser,deleteUser,updateUserPassword};
// getAllUsers getSingleUser getCurrentUser(along with notes adding at later stage) updateUser deletUser updateUserPassword