import React from "react";

function Card ({title, description}){
      console.log({title});
      console.log({description});
      return (
        <>
          <div className="shadow-sm shadow-black rounded-md px-4 py-3 min-w-[90%] max-w-[90%] mx-auto">
            <h2 className="text-lg text-black font-bold">{title}</h2>
            <p className="text-gray-600 whitespace-nowrap text-ellipsis overflow-hidden">{description}</p>
          </div>
        </>
      )
}
export default Card