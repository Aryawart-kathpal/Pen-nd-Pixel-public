import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
import { FaLink } from "react-icons/fa";
import Button from '../../Components/Button'

const AuthorDetails = (props) => {
  return (
    <div>
      <div>
       <img src={props.profilePhoto}/>
        <h1>{props.name}</h1>
      </div>
      <Button 
        handleOnClick={()=>{}}
        text={"Follow"}
        className="px-2 py-1 text-black bg-white text-xl"
      />
      <FaLocationDot />
      <h1>{}</h1>
      <h1>{props?.website}</h1>
      <MdDateRange />
      <FaLink />
    </div>
  )
}

export default AuthorDetails
