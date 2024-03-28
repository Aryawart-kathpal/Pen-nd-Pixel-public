import React from "react";
import { FaRegHeart, FaRegComment } from "react-icons/fa";
function Notes({ title, description, likes, comments }) {
	console.log(title, description, likes, comments);
	return (
		<div className="relative shadow-sm shadow-black rounded-md px-4 py-3 flex flex-col min-w-[90%] max-w-[90%] h-[120px] mx-auto bg-[#ffffff32]">
			<h2 className="text-lg font-bold">{title}</h2>
			<p className="text-gray-500 basis-[100%] text-ellipsis overflow-hidden pr-[100px]">
				{description}
			</p>
			<div className="absolute flex items-center space-x-2 bottom-2 right-2">
				<div className="flex gap-1 items-center">
					<FaRegHeart className="h-5 w-5" />
					<p className="text-xs sm:text-base">{likes}</p>
				</div>
				<div className="flex gap-1 items-center">
					<FaRegComment className="h-5 w-5" />
					<p className="text-xs sm:text-base">{comments.length}</p>
				</div>
			</div>
		</div>
	);
}
export default Notes;
