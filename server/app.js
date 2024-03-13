require('express-async-errors');
require('dotenv').config();

const express = require('express');
const app = express();

const morgan = require('morgan');

// Database
const connectDB=require('./db/connect');
const cookieParser = require('cookie-parser');

// Importing Middleware
const notFoundMiddleware= require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

//Importing Routes
const authRouter=require('./routes/authRoutes');
const userRoutes=require('./routes/userRoutes');
const followRoutes=require('./routes/followRoutes');

//Other packages
const fileUpload = require('express-fileupload');

//Cloudinary
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET,
})

// Middleware
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET))
app.use(morgan('tiny'));
app.use(fileUpload({useTempFiles:true}));
 
//Routes
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/user',followRoutes);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 5000;

const start = async()=>{
    try{
        await connectDB(process.env.MONGO_URI);
        console.log(`Successfully connected to the database...`);
        app.listen(port, console.log(`Server is listening on port ${port}...`));
    }catch(error){
        console.log(error);
    }
}

start();
// follow settings have to be made in the user model only, numOfFollowers and List Of Followers have to be made in the user model only -> aggregate pipleine has to be made for realtime updating the followers and following, also list of following and numOfFollowing has to be made too
// authenticateUser to be stick at the follow also

// sequence-> now firstly userController has to be setup for now and then the notesController with CRUD and other pipeline,etc. have to be setup at the end may be review,comments have to be thought of along with rating of a note

//get Current user and it's analytics such as all his notes, as well as for a note ratings comments,etc. have also to be made in a model
// also some review,contact us,etc. have to be thought of on some later stage, along with setting some pre and post aggregation pipeline for the ratings,etc,