import React from "react";
import { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Card from "../../Components/BrowserCard.jsx";
import { useNavigate } from "react-router-dom";
import Nav from "../../Layouts/Nav.jsx";

const Browser = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState();
  const fetchData = async () => {
    // CODE
  };
  useEffect(() => {
    fetchData();
  }, []);
  const [searchData, setSearchData] = useState([
    {
      id: "1",
      title: "Title 1",
      description: "description 1",
	  category: "Travel",
      tags: [
        "frontend",
        "react",
        "nextJS",
        "frontend",
        "react",
        "nextJS",
        "frontend",
        "react",
        "nextJS",
      ],
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
	  category: "Travel",
      tags: ["frontend", "react"],
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
	  category: "Travel",
      tags: ["frontend", "react"],
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
	  category: "Travel",
      tags: ["frontend", "react"],
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
		category: "Travel",
      tags: [
        "frontend",
        "react",
        "nextJS",
        "frontend",
        "react",
        "nextJS",
        "frontend",
        "react",
        "nextJS",
      ],
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
	  category: "Travel",
      tags: ["frontend", "react"],
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
      id: "7",
      title: "Title 7",
      description: "description 7",
      tags: ["frontend", "react"],
	  category: "Travel",
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

  return (
    <>
      <Nav />
      <div className="shadow-lg shadow-black max-h-[82svh] rounded-md  flex flex-col  gap-8 sm:max-w-[60svw] mx-auto my-5 p-4 items-center bg-[#d3c9c917]">
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
            className="rounded px-4 py-2 outline w-full sm:self-stretch overflow-x-hidden"
          />
          <button className="bg-black text-white rounded px-4 py-2 sm:mt-0  sm:w-auto">
            Search
          </button>
        </div>
        <div className="grid w-full gap-4 overflow-x-hidden py-5 pt-3 overflow-y-scroll customScrollbar">
          {searchData.map((data) => (
            <Card
              key={data.id}
              id={data.id}
              title={data.title}
              description={data.description}
              tags={data.tags}
			  category={data.category}
              content={data.content}
              authorDetails={data.authorDetails}
              className="grid w-full gap-4"
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default Browser;
