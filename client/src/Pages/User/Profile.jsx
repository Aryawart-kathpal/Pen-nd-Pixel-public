import React, { useState } from "react";
import Button from "../../Components/Button";
import { BiSolidHome } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import axiosInstance from "../../Helpers/axiosInstance";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import { BsPersonCircle } from "react-icons/bs";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
} from "@chakra-ui/react";

function Profile({ handleToggle, toggle, user }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const navigate = useNavigate();
	const toast = useToast();
	const [userData, setUserData] = useState(user);
	const [previewImage, setPreviewImage] = useState("");
	console.log(userData);
	//   const [userData, setUserdata] = useState({
	//     name: "Random",
	//     img: "https://cdn-icons-png.flaticon.com/512/3177/3177440.png",
	//     followers: "10",
	//     following: "10",
	//     dateJoined: "13/03/2024",
	//     about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis lectus at leo malesuada volutpat ut ut eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis lectus at leo malesuada volutpat ut ut eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis lectus at leo malesuada volutpat ut ut eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
	//   });

	const handleLogout = async () => {
		const res = axiosInstance.delete("/auth/logout");
		toast.promise(res, {
			loading: { title: "Logging out..." },
			success: { title: "Logged out successfully" },
			error: { title: "Error logging out" },
		});

		localStorage.removeItem("user");
		localStorage.setItem("isLoggedIn", false);

		navigate("/");
	};

	const handleUserInput = (e) => {
		const { name, value } = e.target;
		setUserData({
			...userData,
			[name]: value,
		});
	};

	function getImage(event) {
		event.preventDefault();
		//getting the image
		const uploadedImage = event.target.files[0];
		if (uploadedImage) {
			setUserData({
				...userData,
				image: uploadedImage,
			});
			const fileReader = new FileReader();
			fileReader.readAsDataURL(uploadedImage);
			fileReader.addEventListener("load", function () {
				setPreviewImage(this.result);
			});
		}
	}

	const handleEdit = async () => {
		// If there is a new image upload image to a given router
		let url;
		if(!userData.image || userData.image === "https://www.gravatar.com/avatar/000?d=mp"){
			setUserData({
				...userData,
				image: "https://www.gravatar.com/avatar/000?d=mp",
			});
		}
		else{
			const formData = new FormData();
			formData.append("image", userData.image);
			const res = await axiosInstance.post("/auth/upload-image", formData);
			console.log(res);
			// Take the image url and update the user data
			url = res.data.url;
			setUserData({
				...userData,
				image: res.data.url,
			});
		}
		// Update the user details
		try {
			console.log(userData);
			const res = axiosInstance.patch("/user/update", {
				name: userData.name,
				about: userData.about,
				image: url,
			});
			toast.promise(res, {
				loading: { title: "Updating..." },
				success: { title: "Updated successfully" },
				error: { title: "Error updating" },
			});
			const response = await res;
			console.log(response);
			setUserData({
				...userData,
				name: response.data.name,
				about: response.data.about,
				image: response.data.image,
			});

			// Update the local storage
			const user = JSON.parse(localStorage.getItem("user"));
			user.name = response.data.name;
			user.image = response.data.image;
			localStorage.setItem("user", JSON.stringify(user));
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<div
				// A button to go back to the home page
				className={`w-[480px] mx-2 my-4 customSlideLeft max-sm:absolute max-sm:w-[95svw] max-sm:backdrop-blur-3xl z-10 ${
					toggle ? "" : "max-sm:hidden"
				}`}
			>
				<BiSolidHome
					className="text-3xl absolute left-0 top-0 m-4 cursor-pointer"
					onClick={() => navigate("/")}
				/>
				<FaTimes
					className="text-3xl  absolute right-0 top-0 m-4 cursor-pointer sm:hidden"
					onClick={handleToggle}
				/>
				<div className="rounded-lg shadow-lg shadow-black py-6 ml-2 h-[95svh] flex flex-col">
					<img
						src={userData.image}
						alt="Profile Picture"
						className="rounded-full w-24 h-24 mx-auto border-4 border-black mb-4 max-sm:mb-0"
					/>
					<h2 className=" text-2xl font-bold text-center mb-2 max-sm:mb-0">
						{userData.name}
					</h2>
					<p className=" text-sm text-center mb-2 max-sm:mb-1">
						Joined on {userData.dateJoined}
					</p>
					<div className="flex justify-evenly ">
						<div>
							<p className="text-lg  font-semibold">
								{userData.numOfFollowers}
							</p>
							<p className="text-xs ">Followers</p>
						</div>
						<div>
							<p className="text-lg  font-semibold">
								{userData.numOfFollowing}
							</p>
							<p className="text-xs ">Following</p>
						</div>
					</div>
					<div className="rounded-lg pt-10 px-6 max-h-[100%] flex flex-col self-stretch grow">
						<h3 className="text-lg font-bold mb-2 max-sm:text-md">About Me</h3>
						<p className="text-sm max-sm:text-xs">{userData.about}</p>
						<div className="flex justify-evenly mt-auto my-4">
							<Button
								text="Edit Profile"
								className="bg-slate-400 font-semibold p-2 border-1 rounded hover:bg-slate-500 hover:text-white transition-all duration-300 ease-in-out"
								handleOnClick={onOpen}
							/>
							{/* Modal */}
							<Modal isOpen={isOpen} onClose={onClose}>
								<ModalOverlay />
								<ModalContent>
									<ModalHeader>Edit Profile</ModalHeader>
									<ModalCloseButton />
									<ModalBody>
										{/* Image */}
										<label htmlFor="image_uploads" className="cursor-pointer">
											{previewImage ? (
												<img
													className="w-24 h-24 rounded-full mx-auto"
													src={previewImage}
												/>
											) : (
												<BsPersonCircle className="w-24 h-24 rounded-full my-[20px] mx-auto shadow-[0_0_15px_yellow]" />
											)}
										</label>
										<input
											className="hidden"
											type="file"
											name="image"
											id="image_uploads"
											accept=".jpg, .jpeg, .png, .svg"
											onChange={getImage}
										/>
										{/* Name */}
										<label htmlFor="name" className="text-sm">
											Name
										</label>
										<input
											type="text"
											name="name"
											id="name"
											value={userData.name}
											onChange={handleUserInput}
											className="w-full p-2 border-1 rounded  outline"
										/>
										{/* Email but disabled */}
										<label htmlFor="email" className="text-sm">
											Email
										</label>
										<input
											type="email"
											name="email"
											id="email"
											value={userData.email}
											disabled
											className="w-full p-2 border-1 rounded"
										/>
										{/* About (max character 500) */}
										<label htmlFor="about" className="text-sm">
											About
										</label>
										<textarea
											name="about"
											id="about"
											value={userData.about}
											onChange={handleUserInput}
											className="w-full p-2 border-1 rounded outline resize-none h-24"
										/>
									</ModalBody>
									<ModalFooter>
										<Button
											text="Save"
											className="bg-slate-400 font-semibold p-2 border-1 rounded hover:bg-slate-500 hover:text-white transition-all duration-300 ease-in-out"
											handleOnClick={() => {
												handleEdit();
												onClose();
											}}
										/>
									</ModalFooter>
								</ModalContent>
							</Modal>

							<Button
								text="Logout"
								className="bg-slate-400 font-semibold p-2 border-1 rounded hover:bg-slate-500 hover:text-white transition-all duration-300 ease-in-out"
								handleOnClick={handleLogout}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
export default Profile;
