import React from 'react'
import {useState,useEffect} from 'react'
import './Browser.css' 
import Card from '../Components/BrowserCard.jsx'
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
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={handleSearch}
      />
      <button className="bg-white p-4">🔍</button>
      <div className="cards-container">
        {
          searchData.map((data) => {
            return <Card key={data.id} title={data.title} description={data.description} />
          })
        }
      </div>
    </div>
  )
}

export default Browser
