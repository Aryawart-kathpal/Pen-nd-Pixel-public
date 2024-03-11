import React from 'react'
import {useState,useEffect} from 'react'
import './Browser.css' 
const Browser = () => {
  const Card = ({ title, description }) => (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
  const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
  
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
  
      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);
  
    return debouncedValue;
  };
  const [searchText, setSearchText] = useState('');
  const [cardsData, setCardsData] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);

  const debouncedSearchText = useDebounce(searchText, 300);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch('https://api.example.com/cards');
        // const data = await response.json();
        // setCardsData(data);
        
        // Sample data for demonstration
        const dataFromDatabase = [
          { id: 1, title: 'Card 1', description: 'Description for Card 1' },
          { id: 2, title: 'Card 2', description: 'Description for Card 2' },
          { id: 3, title: 'Card 3', description: 'Description for Card 3' },
          // Add more cards as needed
        ];
        setCardsData(dataFromDatabase);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredCards = cardsData.filter(card =>
      card.title.toLowerCase().includes(debouncedSearchText.toLowerCase())
    );
    setFilteredCards(filteredCards);
  }, [cardsData, debouncedSearchText]);

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
      <div className="cards-container">
        {filteredCards.map(card => (
          <Card key={card.id} title={card.title} description={card.description} />
        ))}
      </div>
    </div>
  )
}

export default Browser
