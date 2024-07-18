import React from "react";
import { useState } from "react";
import Button from "../../Components/Button";
import { MdOutlineInsertComment } from "react-icons/md";

const NewComment = ({addComment}) => {
  const [comment, setComment] = useState({
		name: "",
		email: "",
		comment: "",
	});
	const handleChange = (e) => {
		setComment({
			...comment,
			[e.target.name]: e.target.value,
		});
	};
	const handleOnClick = (e) => {
		console.log("hello button");
		// Use addComment to add the comment to the comments array
		if(comment.comment.trim()==="")
		{
			setComment({
				name: "",
				email: "",
				comment: "",
			});
			return;
		}
		else
		{
		addComment(comment.comment);
    setComment({
			name: "",
			email: "",
			comment: "",
		});
	}
	};
  return (
    <>
      {/* <input
        type="text"
        name="name"
        placeholder="Name"
        className="border border-gray-300 p-2 rounded-md"
        value={comment.name}
        onChange={handleChange}
      />
      <br />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="border border-gray-300 p-2 rounded-md"
        value={comment.email}
        onChange={handleChange}
      />
      <br /> */}
      <textarea
        placeholder="Comment"
        name="comment"
        className="border border-gray-300 p-2 rounded-md text-black"
        value={comment.comment}
        onChange={handleChange}
      />
      <Button
        text="Publish Comment"
        className="customButton mt-2 w-max "
        handleOnClick={handleOnClick}
      />
    </>
  );
};

const Comment = ({ addComment, oldComments }) => {
  return (
		<div className="comment-container max-lg:w-[80%]">
			<div className="comment">
				<h1 className="text-2xl mb-3 font-semibold  text-center">Comments</h1>
				<NewComment addComment={addComment} />

				<div className="flex flex-col gap-2 my-4">
					{
						// Show the comments
						oldComments.map((comment, index) => {
							return (
								<div key={index} className="flex gap-2 items-center">
									<MdOutlineInsertComment className="text-2xl text-gray-400" />
									<p className="text-gray-600">"{comment}"</p>
								</div>
							);
						})
					}
				</div>
			</div>
		</div>
	);
};

export default Comment;
