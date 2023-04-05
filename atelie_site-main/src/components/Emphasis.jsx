import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Emphasis = ({ posts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const sortedPosts = posts
    .filter((post) => post.emphasis === 'Destaque')
    .sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate())
    .slice(0, 5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % sortedPosts.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [currentIndex, sortedPosts.length]);

  const goToIndex = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="flex flex-col items-center">
      <div>
        <div className="flex md:flex-row mx-auto flex-col">
          {sortedPosts.map((post, index) => (
            <Link
              key={post.id}
              to={`/posts/${post.id}`}
              onClick={() => window.scrollTo(0, 0)}
              className="flex"
              style={{ textDecoration: 'none' }}
            >
              <div
                className={`bg-white shadow-md mb-4 rounded-full transform transition-all duration-300 hover:scale-105 hover:opacity-80 ${
                  index === currentIndex ? '' : 'hidden'
                }`}
                style={{
                  backgroundImage: `url(${post.imageUrls[0]})`,
                  height: '220px',
                  width: '400px',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="flex flex-col justify-end px-6 pb-6 h-full">
                  <div
                    className="text-xl font-bold mb-4 text-white text-center"
                    style={{
                      textShadow: '0px 0px 4px rgba(0,0,0, 1)',
                    }}
                  >
                    {post.caption}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center h-full mt-2">
          <button
            className="m-2 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-300 shadow-sm text-gray-500 hover:text-gray-700 focus:outline-none focus:ring focus:border-blue-500 transition-colors duration-300"
            onClick={() =>
              goToIndex(
                (currentIndex - 1 + sortedPosts.length) % sortedPosts.length
              )
            }
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            className="m-2 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-300 shadow-sm text-gray-500 hover:text-gray-700 focus:outline-none focus:ring focus:border-blue-500 transition-colors duration-300"
            onClick={() => goToIndex((currentIndex + 1) % sortedPosts.length)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Emphasis;
