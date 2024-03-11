import React from 'react'
import AuthorDetails from './AuthorDetails'
import Blog from './Blog'
import Comment from './Comment'

const ViewBlog = () => {
  return (
    <>
    <div>
        <Blog />
    </div>
    <div>
        <Comment />
    </div>
    {/* <div>
        <AuthorDetails />
    </div> */}
    </>
  )
}

export default ViewBlog
