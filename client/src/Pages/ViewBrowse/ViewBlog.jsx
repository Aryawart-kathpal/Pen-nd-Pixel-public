import React from 'react'
import AuthorDetails from './AuthorDetails'
import Blog from './Blog'
import Comment from './Comment'
import './ViewBrowse.css'

const ViewBlog = () => {
  return (
    <>
      <div className='viewBlog-container'>
        <Blog />
        <Comment />
      </div>
    </>
  )
}

export default ViewBlog
