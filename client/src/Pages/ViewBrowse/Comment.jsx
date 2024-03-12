import React from 'react'
import Button from '../../Components/Button';

const Comment = () => {
  const handleOnClick=(e)=>{
    console.log("hello button");

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
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 p-2 rounded-md"
        />
        <br />
        <textarea
          placeholder="Comment"
          className="border border-gray-300 p-2 rounded-md"
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
