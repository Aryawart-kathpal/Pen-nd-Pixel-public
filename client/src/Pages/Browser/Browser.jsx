import React from "react";
import { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Card from "../../Components/BrowserCard.jsx";
import { useNavigate } from "react-router-dom";
import Nav from "../../Layouts/Nav.jsx";
import axiosInstance from "../../Helpers/axiosInstance.js";

const Browser = () => {
	const navigate = useNavigate();
	const [searchText, setSearchText] = useState();
	const fetchData = async () => {
		// Get all notes
		const res = await axiosInstance.get("/notes");
		console.log(res.data.notes);
		const data = res.data.notes;
		setSearchData(
			data.map((note, index) => ({
				id: note._id,
				title: note.title,
				description: note.description,
				category: note.category,
				topics: note.tags,
				content: note.content,
				authorDetails: {
					profilePhoto: note?.user?.image,
					name: note?.user?.name,
					date: note?.user?.createdAt,
					followers: note?.user?.numOfFollowers,
					about: note?.user?.about,
				},
				comments: note.comments.map((c) => c.comment),
			}))
			)
		};
	const [searchData, setSearchData] = useState([
		{
			id: "1",
			title: "Title 1",
			description: "description 1",
			category: "frontend",
			topics: ["frontend", "react"],
			content: `<html><title></title><body><h1>Title</h1><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae eaque tenetur asperiores maiores atque ipsa sint! Molestias sint, corporis natus delectus optio quibusdam, ea quae iste, voluptatem accusantium explicabo exercitationem.</p></body></html>`,
			authorDetails: {
				profilePhoto: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
				name: "John Doe",
				date: "",
				location: "",
				website: "",
			},
			comments: ["Comment 1", "Comment 2"],
		},
		{
			id: "2",
			title: "Title 2",
			description: "description 2",
			category: "frontend",
			topics: ["frontend", "react"],
			content: `<html><title></title><body><h1>Title</h1><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae eaque tenetur asperiores maiores atque ipsa sint! Molestias sint, corporis natus delectus optio quibusdam, ea quae iste, voluptatem accusantium explicabo exercitationem.</p></body></html>`,
			authorDetails: {
				profilePhoto: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
				name: "John Doe",
				date: "",
				location: "",
				website: "",
			},
			comments: ["Comment 1", "Comment 2"],
		},
		{
			id: "3",
			title: "Title 3",
			description: "description 3",
			category: "frontend",
			topics: ["frontend", "react"],
			content: `<html><title></title><body><h1>Title</h1><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae eaque tenetur asperiores maiores atque ipsa sint! Molestias sint, corporis natus delectus optio quibusdam, ea quae iste, voluptatem accusantium explicabo exercitationem.</p></body></html>`,
			authorDetails: {
				profilePhoto: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
				name: "John Doe",
				date: "",
				location: "",
				website: "",
			},
			comments: ["Comment 1", "Comment 2"],
		},
		{
			id: "4",
			title: "Title 4",
			description: "description 4",
			category: "frontend",
			topics: ["frontend", "react"],
			content: `<html><title></title><body><h1>Title</h1><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae eaque tenetur asperiores maiores atque ipsa sint! Molestias sint, corporis natus delectus optio quibusdam, ea quae iste, voluptatem accusantium explicabo exercitationem.</p></body></html>`,
			authorDetails: {
				profilePhoto: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
				name: "John Doe",
				date: "",
				location: "",
				website: "",
			},
			comments: ["Comment 1", "Comment 2"],
		},
		{
			id: "5",
			title: "Title 5",
			description:
				"hdvsdcjhsdvhcjvsdvcvjsdvcvsdvjcvsjhdvchksvdhcvshvcshvcjkvscksdvchkvshjvcjvhjsvcjhshshjcvladcvjvjcsdbcvhjdvhjdjvbcj",
			category: "frontend",
			topics: ["frontend", "react"],
			content: `<html><title></title><body><h1>Title</h1><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae eaque tenetur asperiores maiores atque ipsa sint! Molestias sint, corporis natus delectus optio quibusdam, ea quae iste, voluptatem accusantium explicabo exercitationem.</p></body></html>`,
			authorDetails: {
				profilePhoto: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
				name: "John Doe",
				date: "",
				location: "",
				website: "",
			},
			comments: ["Comment 1", "Comment 2"],
		},
		{
			id: "6",
			title: "Title 6",
			description: "description 6",
			category: "frontend",
			topics: ["frontend", "react"],
			content: `<html><title></title><body><h1>Title</h1><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae eaque tenetur asperiores maiores atque ipsa sint! Molestias sint, corporis natus delectus optio quibusdam, ea quae iste, voluptatem accusantium explicabo exercitationem.</p></body></html>`,
			authorDetails: {
				profilePhoto: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
				name: "John Doe",
				date: "2/2/2024",
				location: "Thanesar,Haryana",
				website: "www.google.com",
			},
			comments: ["Comment 1", "Comment 2"],
		},
		{
			id: "7",
			title: "Title 7",
			description: "description 7",
			category: "frontend",
			topics: ["frontend", "react"],
			content: `<html><title></title><body><h1>Title</h1><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae eaque tenetur asperiores maiores atque ipsa sint! Molestias sint, corporis natus delectus optio quibusdam, ea quae iste, voluptatem accusantium explicabo exercitationem.</p></body></html>`,
			authorDetails: {
				profilePhoto: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
				name: "John Doe",
				date: "",
				location: "",
				website: "",
			},
			comments: ["Comment 1", "Comment 2"],
		},
	]);
	const handleSearch = (e) => {
		setSearchText(e.target.value);
	};
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<Nav />
			<div className="shadow-lg shadow-black max-h-[82svh] rounded-md  flex flex-col  gap-8 sm:max-w-[60svw] mx-auto my-5 p-4 items-center">
				<IoIosArrowBack
					className="text-3xl absolute left-10 max-sm:hidden cursor-pointer"
					onClick={() => navigate(-1)}
				/>
				<div className="flex gap-4 items-center w-full sm:max-w-[720px] mt-5 relative">
					<input
						type="text"
						placeholder="Search..."
						value={searchText}
						onChange={handleSearch}
						className="rounded px-4 py-2 outline w-full sm:self-stretch overflow-x-hidden text-black"
					/>
					<button className="bg-black text-white rounded px-4 py-2 sm:mt-0  sm:w-auto">
						Search
					</button>
				</div>
				<div className="grid w-full gap-4 overflow-x-hidden py-5 pt-3 overflow-y-scroll customScrollbar">
					{
						searchData.map((data, index) => (
						<Card
							key={index}
							id={data?._id || data.id}
							title={data.title}
							description={data.description}
							category={data.category}
							topics={data.topics}
							content={data.content}
							authorDetails={data.authorDetails}
							comments={data?.comments || []}
							className="grid w-full gap-4"
						/>
					))}
				</div>
			</div>
		</>
	);
};
export default Browser;
