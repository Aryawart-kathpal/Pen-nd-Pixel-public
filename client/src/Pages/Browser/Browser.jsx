import React from 'react'
import {useState,useEffect} from 'react'
import './Browser.css' 
import HomeLayout from '../../Layouts/HomeLayout.jsx'
import Card from '../../Components/BrowserCard.jsx'
const Browser = () => {
  
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
    }
  ])
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };
  return (
    <HomeLayout >
      <div className="bg-black text-white min-h-[80svh] flex flex-col  gap-4 ">
        <div className="flex w-full gap-4">
          <div className="w-full grid gap-1">
            <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={handleSearch}
            className="bg-gray-200 text-white rounded px-4 py-2 mb-4 focus:outline-none focus:bg-gray-300"
            />
          </div>
          <button className="bg-gray-600 text-white rounded px-4 py-2">Search</button>
        </div>
        <div className="grid w-full gap-4">
          {searchData.map((data) => (
          <div key={data.id} className="flex items-center space-x-4">
            <div className='grid gap-1.5 my-2 '>
              <Card
              title={data.title}
              description={data.description}
              className="grid w-full gap-4"
              />
            </div>
          </div>
          ))}
        </div>
      </div>
    </HomeLayout>
  )
}
export default Browser
