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

//Importing Routes
const authRouter=require('./routes/authRoutes');
 
//Routes
app.use('/api/v1/auth',authRouter);

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

//get Current user and it's analytics such as all his notes, as well as for a note ratings comments,etc. have also to be made in a model
// also some review,contact us,etc. have to be thought of on some later stage, along with setting some pre and post aggregation pipeline for the ratings,etc,