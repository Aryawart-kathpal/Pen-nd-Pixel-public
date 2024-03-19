import React from 'react'
import {useState,useEffect} from 'react'
import { IoIosArrowBack } from "react-icons/io";
import Card from '../../Components/BrowserCard.jsx'
import { useNavigate } from 'react-router-dom';
import Nav from '../../Layouts/Nav.jsx'

const Browser = () => {
  const navigate = useNavigate()
  // const useDebounce = (value, delay) => {
  //   const [debouncedValue, setDebouncedValue] = useState(value);
  
  //   useEffect(() => {
  //     const handler = setTimeout(() => {
  //       setDebouncedValue(value);
  //     }, delay);
  
  //     return () => {
  //       clearTimeout(handler);
  //     };
  //   }, [value, delay]);
  
  //   return debouncedValue;
  // };
  // const [searchText, setSearchText] = useState('');
  // const [filteredCards, setFilteredCards] = useState([]);

  // const debouncedSearchText = useDebounce(searchText, 300);

  // useEffect(() => {
  //   const filteredCards = cardsData.filter(card =>
  //     card.title.toLowerCase().includes(debouncedSearchText.toLowerCase())
  //   );
  //   setFilteredCards(filteredCards);
  // }, [cardsData, debouncedSearchText]);

  const [searchText, setSearchText] = useState()
  const fetchData = async () => {

  }
  useEffect(()=>{
    fetchData();
  }, [])
  const [searchData, setSearchData] = useState([
    {
      id: "1",
      title: "Title 1",
      description: "description 1"
    },
    {
      id: "2",
      title: "Title 2",
      description: "description 2"
    },
    {
      id: "3",
      title: "Title 3",
      description: "description 3"
    },
    {
      id: "4",
      title: "Title 4",
      description: "description 4"
    },
    {
      id: "5",
      title: "Title 5",
      description: "hdvsdcjhsdvhcjvsdvcvjsdvcvsdvjcvsjhdvchksvdhcvshvcshvcjkvscksdvchkvshjvcjvhjsvcjhshshjcvladcvjvjcsdbcvhjdvhjdjvbcj"
    },
    {
      id: "6",
      title: "Title 6",
      description: "description 6"
    },
    {
      id: "7",
      title: "Title 7",
      description: "description 7"
    }

  ])
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };
  return (
    <>
      <Nav />
      <div className="shadow-lg shadow-black text-white max-h-[82svh] rounded-md  flex flex-col  gap-8 sm:max-w-[60svw] mx-auto my-5 p-4 items-center">
        <IoIosArrowBack 
          className="text-3xl absolute text-black left-10 max-sm:hidden cursor-pointer" 
          onClick={() => navigate(-1)}
        />
        <div className="flex  gap-4 items-center w-full  mt-5 relative">
            <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={handleSearch}
            className="bg-white text-black rounded px-4 py-2 outline w-full sm:self-stretch overflow-x-hidden"
            />
          <button className="bg-black text-white rounded px-4 py-2 sm:mt-0  sm:w-auto">Search</button>
        </div>
        <div className="grid w-full gap-4 overflow-x-hidden py-5 pt-3 overflow-y-scroll customScrollbar">
          {searchData.map((data) => (
              <Card
              key={data.id}
              title={data.title}
              description={data.description}
              className="grid w-full gap-4"
              />
          ))}
        </div>
      </div>
    </>
  )
}
export default Browser
