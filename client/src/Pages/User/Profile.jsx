import React, { useState } from "react";
import Button from "../../Components/Button";
import {FaTimes} from "react-icons/fa";
import axiosInstance from "../../Helpers/axiosInstance";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Profile({handleToggle, toggle, user}) {
	const navigate = useNavigate();
	const toast = useToast();
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
			loading: {title: "Logging out..."},
			success: {title: "Logged out successfully"},
			error: {title: "Error logging out"},
		});

		localStorage.removeItem("user");
		localStorage.setItem("isLoggedIn", false);

		navigate("/login");
	}

	const [userData, setUserdata] = useState(user);
	console.log(userData);
  
  return (
		<>
			<div
				className={`w-[480px] mx-2 my-4 customSlideLeft max-sm:absolute max-sm:w-[95svw] max-sm:backdrop-blur-3xl z-10 ${
					toggle ? "" : "max-sm:hidden"
				}`}
			>
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
							/>
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
