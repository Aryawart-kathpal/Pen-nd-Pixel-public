import React from "react";

function Notes({title, desciption, likes, comments}){
    console.log(title, desciption, likes, comments);
    return(
        <div className="border border-black rounded-sm basis-[100%]">
            <div>
                {title}
            </div>
        </div>
    )
}
export default Notes