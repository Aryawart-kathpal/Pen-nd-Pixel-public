import RichEditor from "./RichEditor";
import EditorAside from "./EditorAside";
import { IoIosArrowForward } from "react-icons/io";
import Nav from "../../Layouts/Nav";
import "./editor.css";
import { useState } from "react";

export default function CreateNote({title, noteId}) {
	// State variables
	const [noteDetails, setNoteDetails] = useState({
		title: title || "",
		description: "",
		tags: [],
		category: "",
	});
	const [content, setContent] = useState(
		"<h1>Hello I am a rich text editor!</h1>"
	);
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
					<RichEditor content={content} handleOnBlur={handleBlur} />
				</div>
			</div>
		</>
	);
}
