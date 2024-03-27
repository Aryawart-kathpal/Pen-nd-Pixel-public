import React from "react";
import { FaRegHeart ,FaRegComment} from "react-icons/fa";
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
            <FaRegHeart className="h-6 w-8"/>
            
            <p className="text-sm sm:text-base">{likes}</p>
          </div>
          <div className="flex">
            <FaRegComment className="h-6 w-8"/>
            <p className="text-sm sm:text-base">{comments.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Notes;
