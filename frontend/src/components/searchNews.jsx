import React, { useState } from 'react';
import Loader from './Loader';
// require("dotenv").config();
import NewsCards from './NewsCards';
// import Loader from './Loader';
// import SearchResult from './SearchResult';


const API_KEY = import.meta.env.VITE_API_KEY; // Replace with your GNews API key
const BASE_URL = 'https://gnews.io/api/v4/search';




// fetch(`http://localhost:5000/search/q=${searchtype}?page=${page}&pageSize=${pageSize}`)

function SearchNews() {
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState('');

  // const params = useParams();
  // const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  // const [searchResult, setSearchResult] = useState([]);


  function handlePrev() {
    setPage(page - 1);
  }

  function handleNext() {
    setPage(page + 1);
  }

  let pageSize = 10;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setQuery("");
    try {
      const response = await fetch(`${BASE_URL}?q=${encodeURIComponent(query)}&lang=en&token=${API_KEY}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTotalResults(data.totalArticles);
      setArticles(data.articles);
    } catch (error) {
      setError('There was an error while fetching the news');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 mt-40">
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search News..."
          className=" p-2 border-y-3 shadow-lg rounded w-full text-gray-800"
          required
        />
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>



      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className='my-10 cards grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3 '>
        {!isLoading ? (
          articles.length > 0 ? (
            articles.map((element, index) => (
              <NewsCards
                key={index}
                title={element.title}
                description={element.description}
                image={element.image}
                publishedAt={element.publishedAt}
                url={element.url}
                author={element.source.name}
                source={element.source.url}
              />
            ))
          ) : (

            <p className='text-center'>"What are you waiting for, sip coffee and search your crispy trending news !!!"</p>


          )
        ) : (
          <Loader />
        )}
      </div>
      {!isLoading && articles.length > 0 && (
        <div className="pagination flex justify-center gap-14 my-10 items-center mb-5">
          <button disabled={page <= 1} className='pagination-btn' onClick={() => handlePrev}>Prev</button>
          <p className='font-semibold opacity-80'>{page} of {Math.ceil(totalResults / pageSize)}</p>
          <button className='pagination-btn' disabled={page >= Math.ceil(totalResults / pageSize)} onClick={() => handleNext}>Next</button>
        </div>
      )}


    </div>
  );
}

export default SearchNews;
