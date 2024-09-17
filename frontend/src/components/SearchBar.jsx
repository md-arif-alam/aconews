import React, { useEffect, useState } from 'react'
import Loader from './Loader';
// import NewsCards from './NewsCards';
import { useParams } from 'react-router-dom';
import SearchResult from './SearchResult';
function Search() {
  // const { category, searchTerm } = props;
  // const [newz, setNewz] = useState([]);
  // useEffect(() => {

  //   const fetchNewz = async () => {
  //     let url = `https://gnews.io/api/v4/top/top-headlines?lang=en`;
  //     if (category) {
  //       url += `&topic=${category}`;
  //     }
  //     if (searchTerm) {
  //       url += `&q=${searchTerm}`;
  //     }
  //     url += `&apikey=${process.env.API_KEY}`;
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     setNewz(data.articles);
  //   }
  //   fetchNewz()
  // }, [])


  const params = useParams();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const pageSize = 6;

  let searchtype = "";

  const handleSearch = (e) => {
    e.preventDefault();
    searchtype = searchValue;
    console.log(searchtype);

  }



  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(`https://aconews-server-murex.vercel.app/search/q=${searchtype}?page=${page}&pageSize=${pageSize}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then((myJson) => {
        if (myJson.success) {
          setTotalResults(myJson.data.totalArticles);
          setData(myJson.data.articles);
        } else {
          setError(myJson.message || 'An error occurred');
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        setError('Failed to fetch news. Please try again later.');
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      <SearchResult data={data} page={page} isLoading={isLoading} totalResults={totalResults} />
    }

  }, [page, searchtype]);

  return (
    <form className='search-bar my-8 text-center px-2 xs:mb-10 md:mb-16'>
      <input type="text" name='search' className="search-box md:w-2/4 sm:p-4 xs:px-2" placeholder='Search News' onChange={(e) => setSearchValue(e.target.value)} />
      <button type='submit' className='btn' onClick={(e) => handleSearch(e)}>Search</button>

    </form>
  )
}

export default Search