import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Link } from 'react-router-dom';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Loading from './Loading';
import BackButton from './buttons/BackButton';

const Search = () => {
  const [inputValue, setInputValue] = useState('');
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const collectionRef = collection(db, 'posts');
    const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setPosts(data);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const searchPosts = () => {
    const queryText = inputValue.trim().toLowerCase();
    if (queryText) {
      const filteredPosts = posts.filter((post) => {
        return (
          post.caption.toLowerCase().includes(queryText) ||
          post.content.toLowerCase().includes(queryText) ||
          post.category.toLowerCase().includes(queryText)
        );
      });
      setPosts(filteredPosts);
    } else {
      const collectionRef = collection(db, 'posts');
      const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });
        setPosts(data);
      });
      return () => unsubscribe();
    }
  };

  const handleSearch = () => {
    searchPosts();
  };

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div className="mx-12">
        <div className="mx-4 my-8 flex flex-col sm:flex-row justify-center items-center">
          <BackButton />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
            placeholder="Nome ou categoria..."
            className="w-full p-2 border border-gray-400 rounded-md mr-2 ml-12 focus:outline-none focus:ring focus:border-blue-500"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ionicon"
              viewBox="0 0 512 512"
              width="26"
              height="26"
            >
              <path
                d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
                fill="none"
                stroke="currentColor"
                strokeMiterlimit="10"
                strokeWidth="32"
              ></path>
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="32"
                d="M338.29 338.29L448 448"
              ></path>
            </svg>
          </button>
        </div>

        <Tabs>
          <TabList>
            <Tab>Produtos</Tab>
          </TabList>

          <TabPanel>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mx-4 my-8">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  to={`/posts/${post.id}`}
                  className="bg-white rounded-lg shadow-2xl p-24 hover:shadow-xl relative"
                >
                  <h2 className="text-xl font-bold mb-2">{post.caption}</h2>
                  <p
                    className="mb-4 text-gray-600 line-clamp-3"
                    dangerouslySetInnerHTML={{
                      __html: `${post.content.substring(0, 100)}...`,
                    }}
                  ></p>
                  <img
                    src={post.imageUrls[0]}
                    alt={post.caption}
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-lg opacity-0 hover:opacity-100"
                    style={{ backgroundColor: 'gray' }}
                  />

                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-400">
                      {new Date(post.createdAt.toDate()).toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))}
            </ul>
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
};

export default Search;
