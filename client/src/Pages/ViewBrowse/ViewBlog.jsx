import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import AuthorDetails from './AuthorDetails';
import Blog from './Blog';
import Comment from './Comment';
import './ViewBrowse.css';
import Button from '../../Components/Button';
import Nav from '../../Layouts/Nav';
import { VscChevronRight } from "react-icons/vsc";

const ViewBlog = () => {
  const location = useLocation();
  const data = location.state;
  console.log(data);
  const [isOpen, setIsOpen] = useState(false); 
  const [author, setAuthor] = useState(data.authorDetails);
  const [blog, setBlog] = useState(data.content);
  const [title, setTitle] = useState(data.title);
  const [topics, setTopics] = useState(data.topics);
  const [category, setCategory] = useState(data.category);
  const [description, setDescription] = useState(data.description);
  const [comments, setComments] = useState(data.comments);
  const [id, setId] = useState(data.id);

  const newComments = (comment) => {
    setComments([...comments, comment]);
    console.log("new comment", comments);
  };

  return (
		<>
			<div className='fixed top-0 w-full z-20'>
				<Nav />
			</div>
			<div className="viewBlog-container relative lg:flex mt-[10svh]">
				{!isOpen && (
					<VscChevronRight
						className="icon-Container fixed top-[50%] left-0 text-3xl hover:scale-110"
						onClick={() => setIsOpen(!isOpen)}
					/>
				)}
				{isOpen && (
					<>
						<AuthorDetails {...author} handleClose={() => setIsOpen(false)} />
					</>
				)}
				<Blog
					id={id}
					topics={topics}
					title={title}
					category={category}
					description={description}
					blog={blog}
				/>
				<Comment addComment={newComments} oldComments={comments} />
			</div>
		</>
	);
};

export default ViewBlog;

