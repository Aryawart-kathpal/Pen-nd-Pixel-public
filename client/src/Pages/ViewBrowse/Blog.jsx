import { Button } from "@chakra-ui/react";
import axiosInstance from "../../Helpers/axiosInstance";
import parse from "html-react-parser";
import React from "react";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";

const Blog = ({ id, blog, topics, title, description, category }) => {
	const toast = useToast();
	console.log(id, topics, title, description, category);
	const [summary, setSummary] = useState("");
	const summarize = async () => {
		try {
			const resp = axiosInstance.get(`/notes/summary/${id}`);
			toast.promise(resp, {
				loading: { title: "Loading", description: "Summarizing the blog..." },
				success: {
					title: "Success",
					description: "Blog summarized successfully",
					status: "success",
				},
				error: {
					title: "Error",
					description: "Error occurred while summarizing the blog",
					status: "error",
				},
			});
			const res = await resp;
			setSummary(res?.data?.summary);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<div className="blog-container customScrollbar">
				<div className="flex justify-between items-center">
					<h1 className="text-4xl font-bold">{title}</h1>
					<div className="flex items-center">
						<span className="text-sm bg-gray-200 py-2 px-3 rounded-l-md text-slate-600 font-semibold">
							Category:
						</span>
						<span className="text-sm text-gray-200 py-2 px-3 rounded-r-md bg-slate-600">
							{category}
						</span>
					</div>
				</div>
				<p className="text-gray-500 my-1">{description}</p>
				<div className="blog-content">
					{/* {blog.includes("<html>") ? (
          <div dangerouslySetInnerHTML={{ __html: blog }}></div>
        ) : (
          <p>{blog}</p>
        )} */}
					{parse(blog)}
				</div>
				<div className="flex items-center gap-2 flex-wrap">
					<h1 className="text-lg font-base w-full">Topics:</h1>
					{topics.map((topic, index) => (
						<span
							key={index}
							className="text-sm text-gray-200 px-1 rounded-sm bg-slate-600 font-medium"
						>
							{topic}
						</span>
					))}
				</div>
				<Button className="mt-4 bg-black text-white" onClick={summarize}>
					Summarization
				</Button>
				<div className="py-5">
					{summary && <h1 className="text-xl font-semibold">Summary:</h1>}
					<div
						// dangerouslySetInnerHTML={{ __html: summary }}
						className="list-disc"
					>
            {parse(summary)}
          </div>
				</div>
			</div>
		</>
	);
};

export default Blog;
