import React from "react";
import { useNavigate } from "react-router-dom";

function Card ({id, title, description, topics, content, authorDetails, comments}){
      const navigate = useNavigate()
      const data = {
        title,
        description,
        content,
        topics,
        authorDetails,
        comments
      }
      return (
          <div 
            className="shadow-sm shadow-black rounded-md px-4 py-3 min-w-[90%] max-w-[90%] mx-auto cursor-pointer" 
            onClick={() => navigate(`/blog/${id}`, {state: {...data}})}>
            <h2 className="text-lg font-bold">{title}</h2>
            <p className="text-gray-600 whitespace-nowrap text-ellipsis overflow-hidden">{description}</p>
          </div>
      )
}
export default Card