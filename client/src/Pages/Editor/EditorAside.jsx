import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../Context/ThemeProvider";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { AiOutlineShareAlt } from "react-icons/ai";
import { AiOutlineTeam } from "react-icons/ai";
import { RiCloseCircleFill } from "react-icons/ri";
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
import axiosInstance from "../../Helpers/axiosInstance";

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

const EditorAside = ({
	open,
	handleOpen,
	handlePublic,
	handlePrivate,
	save,
	handleDescription,
	handleTags,
	handleSharedWith,
	handleTitle,
	handleCategory,
	noteDetails,
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { isDarkMode, toggleTheme } = useTheme();
	const navigate = useNavigate();
	return (
		<div
			className={`customSlideLeft w-[250px] h-[90svh] ${
				open ? "" : "max-lg:hidden"
			} max-lg:absolute z-10 max-lg:backdrop-blur-3xl top-0 left-0 flex flex-col gap-2 max-sm:backdrop-blur-3xl`}
		>
			<RiCloseCircleFill
				className="w-6 h-6 max-lg:absolute lg:hidden z-20 top-4 right-4"
				onClick={handleOpen}
			/>
			<div className="flex flex-col gap-1">
				<div
					className={`flex items-center  justify-center gap-6 cursor-pointer ${
						isDarkMode ? `hover:bg-slate-700` : `hover:bg-slate-300`
					} duration-500 hover:shadow-slate-300 px-4 border-slate-500 h-14`}
					onClick={() => navigate("/user")}
				>
					<MdSpaceDashboard className="w-6 h-6" />
					<span className="w-full font-bold">Dashboard</span>
				</div>

				{/* Save Note */}
				<div
					className={`flex items-center  justify-center gap-6 cursor-pointer ${
						isDarkMode ? `hover:bg-slate-700` : `hover:bg-slate-300`
					} duration-500 hover:text hover:shadow-slate-300 px-4 border-slate-500 h-14`}
					onClick={save}
				>
					<MdOutlineCreateNewFolder className="w-6 h-6" />
					<span className="w-full">Save Note</span>
				</div>

				{/* Start Collaboration */}
				<div
					className={`flex items-center  justify-center gap-6 cursor-pointer ${
						isDarkMode ? `hover:bg-slate-700` : `hover:bg-slate-300`
					} duration-500 hover:text hover:shadow-slate-300 px-4 border-slate-500 h-14`}
				>
					<AiOutlineTeam className="w-6 h-6" />
					<span className="w-full">Start Collaboration</span>
				</div>

				{/* Share Button */}
				<div
					className={`flex items-center  justify-center gap-6 cursor-pointer ${
						isDarkMode ? `hover:bg-slate-700` : `hover:bg-slate-300`
					} duration-500 hover:text hover:shadow-slate-300 px-4 border-slate-500 h-14`}
					onClick={onOpen}
				>
					<AiOutlineShareAlt className="w-6 h-6" />
					<span className="w-full">Share</span>

					{/* ChakraUI modal to take all details like Title, Category, Description, Tags before share*/}
					{/* There are two buttons `Public` and `ShareWith` on ShareWith click it will ask for some comma separated emails and then click button send */}
					<Modal isOpen={isOpen} onClose={onClose}>
						<ModalOverlay />
						<ModalContent>
						<ModalHeader>Share Note</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<FormControl>
								<FormLabel>Title</FormLabel>
								<Input
									type="text"
									id="noteTitle"
									placeholder="Title of the note"
									value={noteDetails.title}
									onChange={handleTitle}
								/>
								<FormLabel>Category</FormLabel>
								<select
									id="noteCategory"
									className="w-full p-2 border-2 rounded-md"
									onChange={handleCategory}
									value={noteDetails.category}
								>
									{values.map((value, index) => {
										return (
											<option key={index} value={value}>
												{value}
											</option>
										);
									})}
								</select>
								<FormLabel>Description</FormLabel>
								<Input
									type="text"
									id="noteDescription"
									placeholder="Description of the note"
									onChange={handleDescription}
								/>
								<FormLabel>Tags</FormLabel>
								<Input
									type="text"
									id="noteTags"
									placeholder="Tags of the note separated by ','"
									onChange={handleTags}
								/>
								<FormLabel>Shared With</FormLabel>
								<Input
									type="text"
									id="noteSharedWith"
									placeholder="In case Private Share Enter Emails separated by ','"
									onChange={handleSharedWith}
								/>

							</FormControl>
						</ModalBody>
						<ModalFooter className="gap-5">
							<button
								className="bg-blue-400 px-2 py-1 rounded-md text-white"
								onClick={handlePublic}
							>
								Public
							</button>
							<button
								className="bg-blue-400 px-2 py-1 rounded-md text-white"
								onClick={handlePrivate}
							>
								Private
							</button>
						</ModalFooter>
						</ModalContent>
					</Modal>
				</div>

				{/* Export Button */}
				{/* <div
					className={`flex items-center  justify-center gap-6 cursor-pointer ${
						isDarkMode ? `hover:bg-slate-700` : `hover:bg-slate-300`
					} duration-500 hover:text hover:shadow-slate-300 px-4 border-slate-500 h-14`}
				>
					<AiOutlineExport className="w-6 h-6" />
					<span className="w-full">Export</span>
				</div> */}

				{/* Copy HTML */}
				{/* <div
					className={`flex items-center  justify-center gap-6 cursor-pointer ${
						isDarkMode ? `hover:bg-slate-700` : `hover:bg-slate-300`
					} duration-500 hover:text hover:shadow-slate-300 px-4 border-slate-500 h-14`}
				>
					<AiOutlineCopy className="w-6 h-6" />
					<span className="w-full">Copy HTML</span>
				</div> */}
			</div>
		</div>
	);
};

export default EditorAside;
