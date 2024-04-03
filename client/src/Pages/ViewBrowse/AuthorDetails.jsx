import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
import { FaLink } from "react-icons/fa";
import Button from '../../Components/Button'

const AuthorDetails = (props) => {
  return (
    <>
      <div className='h-screen min-w-[250px] bg-slate-400 absolute z-20 left-0 p-3 flex flex-col customSlideLeft '>
        <div >
          <div className='flex flex-col items-center'>
          <img src={props.profilePhoto} className="w-20 h-20 " />
          <h1>{props.name}</h1>
          <Button 
          handleOnClick={()=>{}}
          text={"Follow"}
          className="px-2 py-1 text-black text-xs border-2 border-black rounded-md m-2 bg-slate-400"
          />
          </div>
        </div>
        
        <div className='flex items-center gap-1'>
          <FaLocationDot />
          <h1>{props.location}</h1>     
        </div>
        <div className='flex items-center gap-1'>
          <MdDateRange />
          <h1>{props.date}</h1>
        </div>
        <div className='flex items-center gap-1'>
          <FaLink />
          <h1>{props.website}</h1>
        </div>
      </div>
    </>
  );
}

export default AuthorDetails  
