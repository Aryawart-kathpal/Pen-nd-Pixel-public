import React, { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

import AuthorDetails from './AuthorDetails'
import Blog from './Blog'
import Comment from './Comment'
import './ViewBrowse.css'
import Button from '../../Components/Button'
import { GiHamburgerMenu } from "react-icons/gi";

const ViewBlog = () => {
  const { id } = useParams();

  const location = useLocation();
	const data = location.state;
  console.log(data);
  const [isOpen,setIsOpen] = useState(false); //For Responsive Design

  // State passed using useLocation
  const [author, setAuthor]=useState(data.authorDetails)
  const [blog, setBlog]=useState(data.content)
  const [title, setTitle]=useState(data.title)
  const [topics, setTopics]=useState(data.topics)
  const [description, setDescription]=useState(data.description)
  const [comments, setComments]=useState(data.comments)

  // New Comments set
  const newComments = (comment) => {
    setComments([...comments, comment])

    // Update the comments in the database
    // CODE for API call
  }

  return (
    <>
      <div className='viewBlog-container p-[2%] relative'>
        {!isOpen && (
        <GiHamburgerMenu 
          className='icon-Container absolute text-3xl' 
          onClick={() => setIsOpen(!isOpen)} 
        />
        )}
        {
          isOpen && 
          <AuthorDetails
            {...author}
          />
        }
        <Blog 
          topics={topics}
          blog={blog}
        />
        {/* Comment need a reference of the present blog */}
        <Comment addComment={newComments} />
      </div>
    </>
  )
}

export default ViewBlog
