import React from "react";

function Card ({title, description}){
      console.log({title});
      console.log({description});
      return (
        <>
          <div>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        </>
      )
}
export default Card