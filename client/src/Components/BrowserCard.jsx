import React from "react";
import { useNavigate } from "react-router-dom";

function Card({
	id,
	title,
	description,
  category,
	topics,
	content,
	authorDetails,
	comments,
}) {
	const navigate = useNavigate();
	const data = {
		title,
		description,
    category,
		content,
		topics,
		authorDetails,
		comments,
	};
	return (
		<div
			className="shadow-sm shadow-black rounded-md px-4 py-3 min-w-[90%] max-w-[90%] mx-auto cursor-pointer"
			onClick={() => navigate(`/blog/${id}`, { state: { ...data } })}
		>
			<div className="flex justify-between items-center">
				<h2 className="text-lg font-bold">{title}</h2>
				<div className="rounded-lg font-semibold px-2.5 py-0.5 border bg-gray-200 dark:text-black my-1 mr-2">
					{category}
				</div>
			</div>
			<p className="text-gray-600 whitespace-nowrap text-ellipsis overflow-hidden">
				{description}
			</p>
		</div>
	);
}
export default Card;
