import RichEditor from "./RichEditor";
import EditorAside from "./EditorAside";
import axiosInstance from "../../Helpers/axiosInstance";
import { useToast } from "@chakra-ui/react";
import { IoIosArrowForward } from "react-icons/io";
import Nav from "../../Layouts/Nav";
import "./editor.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CreateNote() {
	const {id} = useParams();
	const toast = useToast();
	// State variables
	const [noteDetails, setNoteDetails] = useState({
		title: "",
		description: "",
		tags: [],
		category: "",
	});
	const [content, setContent] = useState(
		"<h1>Hello I am a rich text editor!</h1>"
	);

	// Fetch note details
	const fetchNoteDetails = async () => {
		console.log("Fetching note details");
		try {
			const res = await axiosInstance.get(`/notes/${id}`);
			console.log(res.data.note);
			setNoteDetails(res.data.note);
			setContent(res.data.note.content);
		} catch (error) {
			console.error(error);
			toast({
				title: "Failed to fetch note details",
				description: "Please try again later",
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		}
	}
	useEffect(() => {
		// Make api call to get note details
		try {
			fetchNoteDetails();
		} catch (error) {
			console.error(error);
			toast.error({title : "Failed to fetch note details"})
		}
	}, []);

	const [open, setOpen] = useState(false);

	// Functions
	const handleBlur = (newContent) => {
		setContent(newContent);
		console.log(newContent);
	};
	const handleDescription = (e) => {
		setNoteDetails({ ...noteDetails, description: e.target.value });
	}
	const handleTags = (e) => {
		const tagArray = e.target.value.split(",");
		// Also trim
		tagArray.forEach((tag, index) => {
			tagArray[index] = tag.trim();
		});
		
		setNoteDetails({ ...noteDetails, tags: tagArray });
	}
	const handleTitle = (e) => {
		setNoteDetails({ ...noteDetails, title: e.target.value });
	}
	const handleCategory = (e) => {
		setNoteDetails({ ...noteDetails, category: e.target.value });
	}
	const handlePublic = () => {
		console.log("Public", content);
	};
	const handlePrivate = () => {
		console.log("Private", content);
	};
	const handleSave = () => {
		console.log("Save", content);
	};
	function handleOpen() {
		setOpen(!open);
	}
	return (
		<>
			<Nav />
			<div className="flex relative max-h-[90svh]">
				{!open && (
					<IoIosArrowForward
						className="w-6 h-6 lg:hidden absolute top-[50%] translate-y-[-50%] left-0 z-10"
						onClick={handleOpen}
					/>
				)}
				<EditorAside
					open={open}
					handleOpen={handleOpen}
					handlePublic={handlePublic}
					handlePrivate={handlePrivate}
					save={handleSave}
				/>
				<div className="basis-[100%] max-h-full overflow-auto">
					<div className="flex items-center justify-between h-[10svh]">
						<h1>{noteDetails.title}</h1>
						<div className="flex items-center">
							<span className="text-sm bg-gray-200 py-2 px-3 rounded-l-md text-slate-600 font-semibold">
								Category:
							</span>
							<span className="text-sm text-gray-200 py-2 px-3 rounded-r-md bg-slate-600">
								{noteDetails.category}
							</span>
						</div>
					</div>
					<RichEditor content={content} handleOnBlur={handleBlur} />
				</div>
			</div>
		</>
	);
}
