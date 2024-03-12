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

// Middleware
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET))
app.use(morgan('tiny'));

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