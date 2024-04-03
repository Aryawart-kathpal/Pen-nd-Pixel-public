import React from "react";
import { useState } from "react";
import Button from "../../Components/Button";

const NewComment = () => {
  return (
    <>
      <input
        type="text"
        placeholder="Name"
        className="border border-gray-300 p-2 rounded-md"
        onChange={handleChange}
      />
      <br />
      <input
        type="email"
        placeholder="Email"
        className="border border-gray-300 p-2 rounded-md"
        onChange={handleChange}
      />
      <br />
      <textarea
        placeholder="Comment"
        className="border border-gray-300 p-2 rounded-md"
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
  // Handle input onChange
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
    addComment(comment);
  };
  return (
    <div className="comment-container">
      <div className="comment">
        <h1 className="text-4xl mb-8 font-semibold  text-center">Comment</h1>
        {
          // Show the comments
          oldComments.map((comment, index) => {
            return (
              <div key={index} className="comment-box">
                <h1 className="text-lg font-semibold">{comment.name}</h1>
                <p className="text-gray-600">{comment.comment}</p>
              </div>
            );
          })
        }
        {
          // Show the form to add a new comment
          <NewComment />
        }
      </div>
    </div>
  );
};

export default Comment;
