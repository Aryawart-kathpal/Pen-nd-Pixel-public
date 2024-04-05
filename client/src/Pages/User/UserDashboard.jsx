import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import Notes from "./NotesCard";
import Button from "../../Components/Button";
import { FaBars } from "react-icons/fa";
import Toggle from "../../Components/Toggle";
import { useTheme } from "../../Context/ThemeProvider";
import CreateNote from "../Editor/CreateNote";
import {useNavigate} from 'react-router-dom';
import axiosInstance from "../../Helpers/axiosInstance"
import { useToast } from '@chakra-ui/react'

function UserDasboard() {
	const navigate = useNavigate();
	const toast = useToast();
	const { isDarkMode, toggleTheme } = useTheme();
	const [user, setUser] = useState({
		name: "",
		email: "",
		about: "",
		image: "",
		followers: [],
		following: [],
		numOfFollowers: 0,
		numOfFollowing: 0
	})
	const [notes, setNotes] = useState([
		{
			id: 1,
			title: "Note 1",
			description: "Description of Note 1",
			likes: "4",
			comments: [
				{
					name: "Alex Flex",
					text: "Best Note ever",
				},
				{
					name: "Alex Flex",
					text: "Best Note ever",
				},
				{
					name: "Alex Flex",
					text: "Best Note ever",
				},
			],
		},
		{
			id: 2,
			title: "Note 2",
			description: "Description of Note 2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus quasi distinctio minus vitae. Iste, enim fuga libero cum ea itaque consequatur excepturi reprehenderit quos nihil consectetur, dolore rerum vitae explicabo?",
			likes: "56",
			comments: [],
		},
		{
			id: 3,
			title: "Note 3",
			description: "Description of Note 3",
			likes: "90",
			comments: [
				{
					name: "Alex Flex",
					text: "Best Note ever",
				},
				{
					name: "Alex Flex",
					text: "Best Note ever",
				},
			],
		},
		{
			id: 4,
			title: "Note 4",
			description: "Description of Note 4",
			likes: "80",
			comments: [
				{
					name: "Alex Flex",
					text: "Best Note ever",
				},
				{
					name: "Alex Flex",
					text: "Best Note ever",
				},
			],
		},
		{
			id: 5,
			title: "Note 5",
			description: "Description of Note 5",
			likes: "20",
			comments: [
				{
					name: "Alex Flex",
					text: "Best Note ever",
				},
				{
					name: "Alex Flex",
					text: "Best Note ever",
				},
				{
					name: "Alex Flex",
					text: "Best Note ever",
				},
			],
		},
		{
			id: 6,
			title: "Note 6",
			description: "Description of Note 6",
			likes: "0",
			comments: [
				{
					name: "Alex Flex",
					text: "Best Note ever",
				},
			],
		},
	]);

	const fetchUser = async () => {
		const res = axiosInstance.get("/user/current");
		toast.promise(res, {
			success: { title: 'Welcome'},
			error: { title: 'Failed to Fetch your Dashboard'},
			loading: { title: 'Loading Details', description: 'Please wait' },
		  })
		const response = await res;
		console.log(response.data);
		setUser(
			user.name = response.data.user.name,
			user.email = response.data.user.email,
			user.about = response.data.user.about,
			user.image = response.data.user.image,
			user.followers = response.data.user.followers,
			user.following = response.data.user.following,
			user.numOfFollowers = response.data.user.numOfFollowers,
			user.numOfFollowing = response.data.user.numOfFollowing
		)
		setNotes(response.data.notes);
	}

	useEffect(() => {
		// Get User from server
		fetchUser();
	}, []);

	const [toggle, setToggle] = useState(false);
	function handleToggle() {
		setToggle(!toggle);
	}
	return (
		<div className="flex max-h-screen relative">
			<FaBars
				className={`text-3xl cursor-pointer absolute top-5 left-5 z-10 sm:hidden  ${
					toggle ? "max-sm:hidden" : ""
				}`}
				onClick={handleToggle}
			/>
			<Profile handleToggle={handleToggle} toggle={toggle} user={user} />
			<div className="flex flex-col items-center basis-[100%] p-4">
				<div className="banner bg-slate-400 self-stretch h-48 flex items-center justify-center relative rounded-lg text-5xl font-semibold mb-2">
					<Toggle
						onToggle={toggleTheme}
						tailwind="absolute top-1 right-1 text-base"
					/>
					MY NOTES
				</div>

				<div className="flex flex-col w-full gap-5 overflow-x-hidden overflow-y-scroll customScrollbar py-5 pt-3 h-[65%] sticky ">
					{notes.map((note, index) => {
						return <Notes note={note} key={index} />;
					})}
				</div>
				<div className=" flex justify-center mt-4">
					<Button
						text="Create new note"
						className="bg-slate-400 font-semibold p-2 border-2 rounded hover:bg-slate-500 hover:text-white transition-all duration-300 ease-in-out"
						handleOnClick={() => {
							console.log("Clicked");
							navigate("/blog/new");
						}}
					/>
				</div>
			</div>
		</div>
	);
}
export default UserDasboard;
