import React from 'react'
import AuthorDetails from './AuthorDetails'
import Blog from './Blog'
import Comment from './Comment'
import './ViewBrowse.css'
import Button from '../../Components/Button'

const ViewBlog = () => {
  return (
    <>
      <div className='viewBlog-container p-[2%]'>
        <Blog />
        <Comment />
      </div>
    </>
  )
}

export default ViewBlog
