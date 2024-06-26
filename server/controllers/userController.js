const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermissions } = require("../utils");
const cloudinary = require("cloudinary");
const Note = require("../models/Note");
const mongoose = require("mongoose");
const { sendEmail } = require("../utils");

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET,
})

const getAllUsers = async (req, res) => {
	const users = await User.find({})
		.select("-password")
		.populate({ path: "followers following", select: "name image" })
		.populate({ path: "likes", select: "title description" });
	res.status(StatusCodes.OK).json({ users, count: users.length });
};

const getSingleUser = async (req, res) => {
	const { id } = req.params;
	// dono followers aur following ko use kar skta hu path mein space deke bas
	// unneccessary space dene se error aa rha 'following ' ke end mein
	const user = await User.findOne({ _id: id })
		.select("-password")
		.populate({ path: "followers following", select: "name image" })
		.populate({ path: "likes", select: "title description" });
	// another way, don't even have to make a diff populate statment in schema

	res.status(StatusCodes.OK).json({ user });
};

const getCurrentUser = async (req, res) => {
	const { userId } = req.user;

	const user = await User.findOne({ _id: userId })
		.select("-password")
		.populate({
			path: "followers following",
			select: "name image",
		})
		.populate({
			path: "likes",
			select: "title description",
		})
		.populate({
			path: "sharedNotes",
			select:
				"title description content user category likes likedBy tags visibility sharedWith",
		});
	// later also have to give some more data including notes and may be setting pipeline too.. -> done
	//name,image,about me of user ->done
	// About note :  title,description,name,content,status-> done
	// followers aur following vgera bhi dena hai ->done
	// background image->done

	// const notes=await Note.find({user:userId}).sort({createdAt:-1}).populate('user',['name','image']).populate('likedBy',['name','image']).populate('comments.user',['name','image']).populate('comments.replies.user',['name','image']).populate('comments.replies.replies.user',['name','image']);
	const notes = await Note.find({ user: userId })
		.populate("comments", ["name", "user", "comment"])
		.populate({
			path: "likedBy",
			select: "name image",
		});

	const stats = await Note.aggregate([
		{ $match: { user: mongoose.Types.ObjectId(userId) } },
		{
			$group: {
				_id: null, // '$user' -> error has match only for one user
				numOfLikes: { $sum: "$likes" },
			},
		},
	]);
	// console.log(stats[0]?.numOfLikes);// was giving error if no notes were there
	let noteLikes = 0;
	if (stats.length !== 0) {
		noteLikes = stats[0].numOfLikes;
	}
	// console.log(noteLikes);

	res
		.status(StatusCodes.OK)
		.json({ user, notes, numOfNotes: notes.length, noteLikes });
};

const updateUser = async (req, res) => {
	// name,email and image only
	const { name, image, about } = req.body;
	if (!name && !image && !about) {
		throw new CustomError.BadRequestError(
			"Please Update name or image or about"
		);
	}

	const user = await User.findOne({ _id: req.user.userId }).select("-password");
    // console.log(image);
    // console.log(user.image);
	if (image!=="") {
		if (image === "https://www.gravatar.com/avatar/000?d=mp") {
			user.image = image;
		} else {
            console.log("Inside deleting");
			function getImagePublicId(cloudinaryUrl) {
				// Split the URL by '/'
				const parts = cloudinaryUrl.split("/");
				// Find the part that contains the public ID
				const publicIdPart = parts[parts.length - 1].split(".")[0];
				return publicIdPart;
			}

			// Example usage
			const cloudinaryUrl = user.image;
			const imagePublicId = getImagePublicId(cloudinaryUrl);
			console.log(imagePublicId); // Output: image_public_id
			// const result = await cloudinary.uploader
			// 	.destroy(imagePublicId)
			// 	.then((result) => {
			// 		console.log("Deleted success:", result);
			// 	})
			// 	.catch((error) => {
			// 		console.error("Error deleting:", error);
			// 	});
            // console.log("Hello");
			await cloudinary.v2.api
				.delete_resources([`Pen-and-Pixel/${imagePublicId}`], {
					type: "upload",
					resource_type: "image",
				})
				.then((result) => {
                    // console.log("Hello");
					console.log("Deleted resources:", result);
				})
				.catch((error) => {
                    // console.log("Bye bye");
					console.error("Error deleting resources:", error);
				});
                // console.log("Deleting completed");

			user.image = image;
		}
	}
	if (name) {
		user.name = name;
	}
	if (about) {
		user.about = about;
	}
	await user.save();

	res
		.status(StatusCodes.OK)
		.json({ msg: "Successfully updated the user", user });
};

const deleteUser = async (req, res) => {
	const { id } = req.params;
	checkPermissions(req.user, id);
	const user = await User.findOne({ _id: id });
	if (!user) {
		throw new CustomError.BadRequestError(`No user exists with id : ${id}`);
	}
	// console.log("Delete user called");
	await user.remove(); // to delete the info at post remove hook, followers, updating lists of followers and following, rating,review,comments,etc.

	// Also deleting the notes of the user, ratings, comments,etc.
	res.status(StatusCodes.OK).json({ msg: "Successfully deleted the user" });
};

const updateUserPassword = async (req, res) => {
	const { userId } = req.user;
	const { oldPassword, newPassword } = req.body;

	if (!oldPassword || !newPassword) {
		throw new CustomError.BadRequestError(
			`Please provide oldPassword and newPassword`
		);
	}

	if (oldPassword === newPassword) {
		throw new CustomError.BadRequestError(
			"New password can't be same as old password"
		);
	}
	const user = await User.findOne({ _id: userId });
	const isPasswordCorrect = await user.comparePassword(oldPassword);
	if (!isPasswordCorrect) {
		throw new CustomError.UnauthenticatedError("Invalid Password");
	}
	user.password = newPassword;
	await user.save();
	res.status(StatusCodes.OK).json({ msg: "Successfully updated the password" });
};

const contactUs = async (req, res) => {
	//to,html,subject
	const { name, email, phone, message } = req.body;

	if (!name || !email || !phone || !message) {
		throw new CustomError.BadRequestError("Please provide all the fields");
	}

	const html = `
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
        <p>Message: ${message}</p>
    `;

	await sendEmail({
		to: "uncannydevs@gmail.com",
		html,
		subject: "Contact Us Form Submission",
	});

	res.status(StatusCodes.OK).json({ msg: "Email sent successfully" });
};

module.exports = {
	getAllUsers,
	getSingleUser,
	getCurrentUser,
	updateUser,
	deleteUser,
	updateUserPassword,
	contactUs,
};
// getAllUsers getSingleUser getCurrentUser(along with notes adding at later stage) updateUser deletUser updateUserPassword
