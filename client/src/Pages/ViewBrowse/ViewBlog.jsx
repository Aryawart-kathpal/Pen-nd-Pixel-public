import React, { useState } from 'react'
import AuthorDetails from './AuthorDetails'
import Blog from './Blog'
import Comment from './Comment'
import './ViewBrowse.css'
import Button from '../../Components/Button'
import { GiHamburgerMenu } from "react-icons/gi";

const ViewBlog = () => {
  const [isOpen,setIsOpen] = useState(false);
  return (
    <>
      <div className='viewBlog-container p-[2%] relative'>
        {!isOpen && (
        <GiHamburgerMenu 
          className='icon-Container absolute text-3xl' 
          onClick={() => setIsOpen(!isOpen)} 
        />
        )}
        <Blog />
        <Comment />
      </div>
    </>
  )
}

export default ViewBlog
