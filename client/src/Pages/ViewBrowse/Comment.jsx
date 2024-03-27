import React from 'react'
import { useState } from 'react'
import Button from '../../Components/Button';

const Comment = ({addComment}) => {
  // Handle input onChange
  const [comment, setComment] = useState({
    name: '',
    email: '',
    comment: ''
  })
  const handleChange=(e)=>{
    setComment({
      ...comment,
      [e.target.name]: e.target.value
    })
  }
  const handleOnClick=(e)=>{
    console.log("hello button");
    // Use addComment to add the comment to the comments array
    addComment(comment)
  }
  return (
    <>
    <div className='comment-container'>
      <div className='comment'>
        <h1 className="text-4xl mb-8 font-semibold  text-center">Leave a Comment</h1>
        <input
          type="text"
          placeholder="Name"
          className="border border-gray-300 p-2 rounded-md"
          onChange={handleChange}
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 p-2 rounded-md"
          onChange={handleChange}
        />
        <br />
        <textarea
          placeholder="Comment"
          className="border border-gray-300 p-2 rounded-md"
          onChange={handleChange}
        />
      </div>
      <Button 
        text="Publish Comment"
        className="customButton mt-auto w-max mx-auto"
        handleOnClick={handleOnClick}
      />
    </div>
    </>
  )
}

export default Comment
