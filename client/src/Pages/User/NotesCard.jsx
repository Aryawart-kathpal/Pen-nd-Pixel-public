import React from "react";

function Notes({ title, description, likes, comments }) {
  console.log(title, description, likes, comments);
  return (
    <div className="shadow-sm shadow-black rounded-md px-4 pt-3 min-w-[90%] max-w-[90%] mx-auto">
      <h2 className="text-lg text-black font-bold">{title}</h2>
      <p className="text-gray-600 whitespace-nowrap text-ellipsis overflow-hidden">
        {description}
      </p>
      <div className="flex justify-between items-center pt-1">
        <div></div>{" "}
        <div className="flex items-center space-x-2">
          <div className="flex">
            <img
              src="https://i.pinimg.com/564x/c6/7d/a0/c67da01511fe76591011a81094846e87.jpg"
              alt="Likes Icon"
              className="w-4 h-5 sm:w-6 sm:h-6"
            ></img>
            <p className="text-sm sm:text-base">{likes}</p>
          </div>
          <div className="flex">
            <img
              src="https://www.pngitem.com/pimgs/m/584-5843167_icon-of-comment-in-white-hd-png-download.png"
              alt="Comments Icon"
              className="w-4 h-5 sm:w-6 sm:h-6"
            ></img>
            <p className="text-sm sm:text-base">{comments.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Notes;
