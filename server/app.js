const fetch = require('node-fetch');
const { Headers, Request, Response } = fetch;

global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;

require("express-async-errors");
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");

// express - app
const express = require("express");
const app = express();

// Socket.io
const server = http.createServer(app);
const io = new Server(server);
module.exports = { app, io };

const morgan = require("morgan");

// Database
const connectDB = require("./db/connect");
const cookieParser = require("cookie-parser");

// Importing Middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//Importing Routes
const authRouter = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const followRoutes = require("./routes/followRoutes");
const noteRoutes = require("./routes/noteRoutes");
const commentRoutes = require("./routes/commentRoutes");
const otherRoutes = require("./routes/otherRoutes");

//Other packages
const fileUpload = require("express-fileupload");
const path = require("path");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");

//Cloudinary
const cloudinary = require("cloudinary");
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET,
});

// Middleware

app.use(
	cors({
		origin: process.env.FRONTEND_URL,
		credentials: true,
	})
);

app.use(xss());
app.use(mongoSanitize());

app.use(express.static(path.resolve(__dirname, "../client/dist")));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(morgan("tiny"));
app.use(fileUpload({ useTempFiles: true }));

//Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/user", followRoutes);
app.use("/api/v1/notes", noteRoutes);
app.use("/api/v1/notes", commentRoutes);
app.use("/api/v1/", otherRoutes);

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

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		console.log(`Successfully connected to the database...`);
		app.listen(port, console.log(`Server is listening on port ${port}...`));
	} catch (error) {
		console.log(error);
	}
};

start();
