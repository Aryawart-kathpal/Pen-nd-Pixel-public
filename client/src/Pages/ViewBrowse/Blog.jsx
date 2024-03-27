import React from 'react'

const Blog = ({blog, topics}) => {
  return (
    <div className='blog-container customScrollbar'>
      {blog.includes('<html>') ? <div dangerouslySetInnerHTML={{__html: blog}}></div> : <p>{blog}</p>}
      {/* <h1>I am blog</h1> */}
      {/* <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus quo, voluptas dolorum cum alias cupiditate quos consequatur nesciunt similique, eius sed sint amet repellendus maiores eaque modi error illo quaerat.</p> */}
    </div>
  )
}

export default Blog
