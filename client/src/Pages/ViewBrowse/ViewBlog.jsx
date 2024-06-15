import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import AuthorDetails from "./AuthorDetails";
import Blog from "./Blog";
import Comment from "./Comment";
import "./ViewBrowse.css";
import Nav from "../../Layouts/Nav";
import { VscChevronRight } from "react-icons/vsc";
import axiosInstance from "../../Helpers/axiosInstance";

const ViewBlog = () => {
	const [isLoading, setIsLoading] = useState(true);
	const location = useLocation();
	const { id } = useParams();
	const [isOpen, setIsOpen] = useState(false);
	const [author, setAuthor] = useState({
		about: "",
		date: "",
		followers: 0,
		name: "",
		profilePhoto: "",
	});
	const [blog, setBlog] = useState("Blog Content");
	const [title, setTitle] = useState("Title");
	const [topics, setTopics] = useState(["Topic1", "Topic2"]);
	const [category, setCategory] = useState("Category");
	const [description, setDescription] = useState("Description");
	const [comments, setComments] = useState(["Comment1", "Comment2"]);

	const newComments = (comment) => {
		setComments([...comments, comment]);
		console.log("new comment", comments);
	};

	//   Fetch Note Using ID
	const fetchNote = async () => {
		try {
			const res = await axiosInstance.get(`/notes/${id}`);
			const data = res.data;
			const user = data.note.user;
			console.log(data);
			const note = data.note;
			// Setting Author Details
			setAuthor({
				about: user?.about,
				date: user?.createdAt,
				followers: user?.numOfFollowers,
				name: user?.name,
				profilePhoto: user?.image,
			});
			// Setting Note Details
			setBlog(note.content);
			setTitle(note.title);
			setTopics(note.tags);
			setCategory(note.category);
			setDescription(note.description);
			setComments(note.comments.map((c) => c.comment));

		} catch (error) {
			console.error(error);
		}finally{
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchNote();
	}, []);

	if (isLoading) {
		return <h1>Loading...</h1>;
	}
	return (
		<>
			<div className="fixed top-0 w-full z-20">
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
