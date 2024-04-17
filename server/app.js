require('express-async-errors');
require('dotenv').config();
const http = require('http');
const socketIo= require('socket.io');
const {Server}= require('socket.io');

const express = require('express');
const app = express();

const server = http.createServer(app);
const io = new Server(server);
module.exports = {app,io};

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
const noteRoutes = require('./routes/noteRoutes');
const commentRoutes = require('./routes/commentRoutes');
const otherRoutes = require('./routes/otherRoutes');

//Other packages
const fileUpload = require('express-fileupload');
const path = require('path');
const { fileURLToPath } = require("url");
const xss=require('xss-clean');
const cors = require('cors');
const rateLimiter = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');

//Cloudinary
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET,
})

// Middleware

app.use(helmet());
// app.use(cors());

app.use(cors(
    {
        origin:process.env.FRONTEND_URL,
        credentials:true,
    }
));

app.use(xss());
app.use(mongoSanitize());
// app.use(rateLimiter({
//     windowMs:15*60*1000,
//     max:60,
// }));

app.use(express.static(path.resolve(__dirname, "../client/dist")));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(morgan('tiny'));
app.use(fileUpload({useTempFiles:true}));
 
//Routes
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/user',followRoutes);
app.use('/api/v1/notes',noteRoutes);
app.use('/api/v1/notes',commentRoutes);
app.use('/api/v1/',otherRoutes);


// serves index.html
app.get("*", (req, res) => {
	try {
		res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
	} catch (error) {
		console.error("Error serving index.html:", error);
		res.status(500).send("Internal Server Error");
	}
});

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

//searching on tags -> done
//getCurrentUser (may be any pipeline linked to it) ->sending exact thing instead of id, using populate->done
//comments->done
// Handling all the things on removal such as comments,likes,etc. -> done
//finishing -> populate,trim:true,
// summary ->done
// contactus(name,email,phone,message),review,etc.->done
// searching on title also ->done
// deleting on deletion
// populate at last, public finishing ->done
start();
// follow settings have to be made in the user model only, numOfFollowers and List Of Followers have to be made in the user model only -> aggregate pipleine has to be made for realtime updating the followers and following, also list of following and numOfFollowing has to be made too
// authenticateUser to be stick at the follow also

// sequence-> now firstly userController has to be setup for now and then the notesController with CRUD and other pipeline,etc. have to be setup at the end may be review,comments have to be thought of along with rating of a note

//get Current user and it's analytics such as all his notes, as well as for a note ratings comments,etc. have also to be made in a model
// also some review,contact us,etc. have to be thought of on some later stage, along with setting some pre and post aggregation pipeline for the ratings,etc,
// linking notes to every use
// one user one note unique comment like in e-commerce
// trim:true in all models?
// comments note model mein nahi alag se bnaye e-commerece ki trah
//getCurrentUser at the end
// ek user ke saari liked posts bhi store krni hain
// likes bhi delete hone chahiye har tarah se, note ko delete karne par
// using mongoose virtuals populate method at end
//summary route