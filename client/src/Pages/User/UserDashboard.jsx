import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import Notes from "./NotesCard";
import Button from "../../Components/Button";
import { FaBars } from "react-icons/fa";
import Toggle from "../../Components/Toggle";
import { useTheme } from "../../Context/ThemeProvider";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Helpers/axiosInstance";
import { useToast } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	FormControl,
	FormLabel,
	Input,
} from "@chakra-ui/react";

// Category Values
const values = [
	"tech",
	"travel",
	"food",
	"music",
	"movies",
	"books",
	"disaster",
	"personal",
	"work",
	"study",
	"ideas",
	"innovation",
	"journal",
	"recipes",
	"health",
	"finance",
	"fitness",
	"fashion",
	"lifestyle",
	"sports",
	"politics",
	"science",
	"history",
	"art",
	"culture",
	"education",
	"environment",
	"religion",
	"philosophy",
	"psychology",
	"self-help",
	"spirituality",
	"technology",
	"movies",
	"quotes",
	"other",
];
// User Dashboard
export default	function UserDashboard() {
		const navigate = useNavigate();
		const toast = useToast();
		const { isOpen, onOpen, onClose } = useDisclosure();
		const { isDarkMode, toggleTheme } = useTheme();
		const [user, setUser] = useState({
			name: "",
			email: "",
			about: "",
			image:
				"https://t3.ftcdn.net/jpg/03/58/90/78/360_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg",
			followers: [],
			following: [],
			numOfFollowers: 0,
			numOfFollowing: 0,
		});
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
				description:
					"Description of Note 2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus quasi distinctio minus vitae. Iste, enim fuga libero cum ea itaque consequatur excepturi reprehenderit quos nihil consectetur, dolore rerum vitae explicabo?",
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
				success: {
					title: "Welcome",
					isClosable: true,
					duration: 2000,
				},
				error: { title: "Failed to Fetch your Dashboard" },
				loading: { title: "Loading Details", description: "Please wait" },
			});
			const response = await res;
			console.log(response.data);
			setUser(
				(user.name = response.data.user.name),
				(user.email = response.data.user.email),
				(user.about = response.data.user.about),
				(user.image = response.data.user.image
					? response.data.user.image
					: "https://t3.ftcdn.net/jpg/03/58/90/78/360_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg"),
				(user.followers = response.data.user.followers),
				(user.following = response.data.user.following),
				(user.numOfFollowers = response.data.user.numOfFollowers),
				(user.numOfFollowing = response.data.user.numOfFollowing)
			);
			setNotes(response.data.notes);
		};

		useEffect(() => {
			// Get User from server
			fetchUser();
		}, []);

		const [toggle, setToggle] = useState(false);
		function handleToggle() {
			setToggle(!toggle);
		}
		const createNote = async () => {
			// Collect the title
			const title = document.getElementById("noteTitle").value;
			// Collect the category
			const category = document.getElementById("noteCategory").value;
			// Make an api call
			const res = axiosInstance.post("/notes/create", {
				title: title,
				category: category,
			});
			toast.promise(res, {
				success: { title: "Note Created" },
				error: { title: "Failed to Create Note" },
				loading: { title: "Creating Note", description: "Please wait" },
			});
			const response = await res;
			console.log(response.data);
			// Redirect to the new note
			navigate(`/blog/new/${response.data.note.id}`);
		};
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
							handleOnClick={onOpen}
						/>

						{/* ChakraUI modal to take the title of the note*/}
						<Modal isOpen={isOpen} onClose={onClose}>
							<ModalOverlay />
							<ModalContent>
								<ModalHeader>Create a new note</ModalHeader>
								<ModalCloseButton />
								<ModalBody>
									<FormControl>
										<FormLabel>Title</FormLabel>
										<Input
											type="text"
											id="noteTitle"
											placeholder="Title of the note"
										/>
										{/* A dropdown list using the array values for category */}
										<FormLabel>Category</FormLabel>
										<select
											id="noteCategory"
											className="w-full p-2 border-2 rounded-md"
										>
											{values.map((value, index) => {
												return (
													<option key={index} value={value}>
														{value}
													</option>
												);
											})}
										</select>
									</FormControl>
								</ModalBody>

								<ModalFooter>
									<Button
										text="Create"
										className="bg-blue-500 text-white font-semibold px-2 py-1 border-2 rounded-md hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in-out"
										// OnClick I will make a api Call with the title, i will get an Id in response and Then I will navigate to /blog/new/:id
										handleOnClick={createNote}
									/>
								</ModalFooter>
							</ModalContent>
						</Modal>
					</div>
				</div>
			</div>
		);
	};
