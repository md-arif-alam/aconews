import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsPagination = () => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const newsPerPage = 10; // Number of news items per page

  useEffect(() => {
    fetchNews(currentPage);
  }, [currentPage]);

  const fetchNews = async (page) => {
    try {
      const response = await axios.get('https://gnews.io/api/v4/top-headlines', {
        params: {
          apikey: 'YOUR_API_KEY',
          lang: 'en',
          page: page,
          max: newsPerPage
        }
      });
      setNews(response.data.articles);
      setTotalResults(response.data.totalResults);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const totalPages = Math.ceil(totalResults / newsPerPage);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-4">
      <ul className="space-y-4">
        {news.map((article, index) => (
          <li key={index} className="border p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold">{article.title}</h2>
            <p>{article.description}</p>
          </li>
        ))}
      </ul>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className={`px-4 py-2 mx-2 rounded ${currentPage === 1 ? 'bg-gray-400' : 'bg-blue-500 text-white'}`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className={`px-4 py-2 mx-2 rounded ${currentPage === totalPages ? 'bg-gray-400' : 'bg-blue-500 text-white'}`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default NewsPagination;
