import { Button } from "@chakra-ui/react";
import React from "react";

const Blog = ({ blog, topics, title, description, category }) => {
  console.log(topics, title, description, category);
  return (
    <>
      <div className="blog-container customScrollbar">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">{title}</h1>
          <div className="flex items-center">
            <span className="text-sm bg-gray-200 py-2 px-3 rounded-l-md text-slate-600 font-semibold">Category:</span>
            <span className="text-sm text-gray-200 py-2 px-3 rounded-r-md bg-slate-600">{category}</span>
          </div>
        </div>
        <p className="text-gray-500 my-1">{description}</p>
        <div className="blog-content">
        {blog.includes("<html>") ? (
          <div dangerouslySetInnerHTML={{ __html: blog }}></div>
        ) : (
          <p>{blog}</p>
        )}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-lg font-base w-full">Topics:</h1>
          {topics.map((topic, index) => (
            <span key={index} className="text-sm text-gray-200 px-1 rounded-sm bg-slate-600 font-medium">
              {topic}
            </span>
          ))}
        </div>
        <Button className="mt-4 bg-black text-white">Summarization</Button>
        <div>
          {/* Div for storing summary */}
        </div>
      </div>
    </>
  );
};

export default Blog;
