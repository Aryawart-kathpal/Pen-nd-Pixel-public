import RichEditor from "./RichEditor";
import EditorAside from "./EditorAside";
import { IoIosArrowForward } from "react-icons/io";
import Nav from "../../Layouts/Nav";
import "./editor.css";
import { useState } from "react";

export default function CreateNote() {
	const [open, setOpen] = useState(false);
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
				<EditorAside open={open} handleOpen={handleOpen} />
				<div className="basis-[100%] max-h-full overflow-auto">
					<RichEditor />
				</div>
			</div>
		</>
	);
}
