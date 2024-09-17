import { React, useState, useEffect } from 'react';
import Loader from './Loader';
import NewsCards from './NewsCards';
import { useParams } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
function News() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const newsPerPage = 6; // Number of news items per page

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetchNews(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil((totalResults / newsPerPage) / 1000);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };




  const fetchNews = async (page) => {
    fetch(`https://aconews-server-murex.vercel.app/news?page=${page}&max=${newsPerPage}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then(myJson => {
        if (myJson.success) {
          setNews(myJson.data.articles);
          setTotalResults(myJson.data.totalArticles);
        } else {
          setError(myJson.message || 'An error occurred');
        }
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setError('Failed to fetch news. Please try again later.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  let arr = news.map((n) => {
    return n.title
  })
  return (
    <>
      {error && <div className="text-red-500 mb-4 ">{error}</div>}

      <div>
        {
          !isLoading == true ? (


            <main className="mt-20 hero">
              <section className="container flex h-[500px] flex-col items-center justify-center md:h-[470px] heroheight heros">
                <p className=" headingyellow text-gray-300 font-bold underline decoration-yellow-50 absolute ">
                  Breaking News
                </p>
                <div className="grid grid-cols-3 items-center gap-10 md:grid-cols-1 ">

                  <div
                    data-aos="fade-right"
                    data-aos-duration="1000"
                    data-aos-once="true"
                    className="flex flex-col items-center gap-6 text-center text-4x"
                  >
                    <div className="txt ">
                      <TypeAnimation
                        sequence={[...arr]}
                        wrapper="span"
                        speed={160}
                        style={{ display: 'inline-block' }}
                        repeat={10}
                        className='text-yellow-300 text-2xl md:text:xl sm:text-lg font-extralight`'
                      />
                    </div>
                  </div>
                </div>
              </section>
            </main>

          ) : (<Loader />)
        }
      </div>

      <div className="my-10 cards grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3">

        {!isLoading ? (
          news.length > 0 ? (
            news.map((element, index) => (
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
            <p>No news articles found for this criteria. May be its due to the maximum limit crossed</p>
          )
        ) : (
          <Loader />
        )}
      </div>
      {!isLoading && news.length > 0 && (
        <div>
          <div className="flex justify-center mt-4 mb-5">
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



      )}
    </>
  );
}

export default News;