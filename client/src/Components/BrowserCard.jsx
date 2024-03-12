import React from "react";

function Card ({title, description}){
      console.log({title});
      console.log({description});
      return (
        <>
          <div className="border-2 border-slate-700 rounded-md  px-4 py-3 w-screen">
            <h2 className="text-lg font-bold">{title}</h2>
            <p className="text-gray-600">{description}</p>
          </div>
        </>
      )
}
export default Card