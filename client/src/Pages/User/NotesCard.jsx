import React from "react";
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Helpers/axiosInstance";
import { useToast } from "@chakra-ui/react";

function Notes({ note }) {
	const navigate = useNavigate();
	const toast = useToast();
	// console.log("NOTE", note);
	function deleteNote() {
		try{
			// Make api call to delete note
			console.log("Note deleted");
			const res = axiosInstance.delete(`/notes/delete/${note.id}`);
			toast.promise(res, {
				loading: {title: "Deleting note"},
				success: {title: "Note deleted"},
				error: {title: "Failed to delete note"},
			});
		}
		catch(error){
			console.error(error);
		}
	}

	return (
		<div 
			className="relative shadow-sm shadow-black rounded-md px-4 py-3 flex flex-col min-w-[90%] max-w-[90%] min-h-[110px] mx-auto bg-[#ffffff32] cursor-pointer hover:bg-[#ffffff64] transition-all duration-300 ease-in-out"
			onClick={() => navigate(`/blog/new/${note?.id}`)}
		>
			<FaTrash 
				className="absolute top-2 right-2 text-slate-900 cursor-pointer hover:scale-105"
				onClick={(e) => {
					e.stopPropagation();
					deleteNote(note.id);
					// Reload the page
					window.location.reload();
				}} 
			/>
			<h2 className="text-lg font-bold">{note?.title}</h2>
			<p className="text-gray-500 basis-[100%] text-ellipsis overflow-hidden pr-[100px]">
				{note?.description}
			</p>
			<div className="absolute flex items-center space-x-2 bottom-2 right-2">
				<div className="flex gap-1 items-center">
					<FaRegHeart className="h-5 w-5" />
					<p className="text-xs sm:text-base">{note?.likes}</p>
				</div>
				<div className="flex gap-1 items-center">
					<FaRegComment className="h-5 w-5" />
					<p className="text-xs sm:text-base">{note?.comments?.length || 0}</p>
				</div>
			</div>
		</div>
	);
}
export default Notes;
