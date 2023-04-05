import { useState, useEffect } from 'react';
import { db, auth } from '../config/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import Navbar from '../components/Navbar';
import Loading from '../components/Loading';
import Footer from '../components/Footer';
import BackButton from '../components/buttons/BackButton';

const PostScreen = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [user] = useAuthState(auth);

  useEffect(() => {
    const docRef = doc(db, 'posts', id);
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        const postData = { ...doc.data(), id: doc.id };
        setPost(postData);
        setIsLoading(false);
        setIsCurrentUser(postData.uid === user.uid);
      }
    });
    return () => unsubscribe();
  }, [id]);

  const nextSlide = () => {
    if (currentIndex === post.imageUrls.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex === 0) {
      setCurrentIndex(post.imageUrls.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row">
          <div className="flex flex-col items-center justify-center space-y-4">
            <BackButton />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap mx-4">
              <div className="w-full lg:w-1/2 px-4 mb-4 lg:mb-0">
                {post.imageUrls.length > 1 && (
                  <div className="relative">
                    <button
                      onClick={prevSlide}
                      className="absolute top-1/2 left-0 transform -translate-y-1/2 rounded-full bg-white border border-gray-300 shadow-lg text-gray-500 hover:text-gray-700 focus:outline-none focus:ring focus:border-blue-500 transition-colors duration-300 px-2 py-1"
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
                    <img
                      src={post.imageUrls[currentIndex]}
                      alt={post.caption}
                      className="mx-auto w-auto h-auto object-cover"
                      style={{ height: '500px', width: '500px' }}
                      onLoad={() => setIsLoading(false)}
                      onError={() => setIsLoading(false)}
                    />
                    <button
                      className="absolute top-1/2 right-0 transform -translate-y-1/2 rounded-full bg-white border border-gray-300 shadow-lg text-gray-500 hover:text-gray-700 focus:outline-none focus:ring focus:border-blue-500 transition-colors duration-300 px-2 py-1"
                      onClick={nextSlide}
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
                )}
                {post.imageUrls.length === 1 && (
                  <img
                    src={post.imageUrls[0]}
                    alt={post.caption}
                    className="mx-auto w-auto h-auto object-contain"
                    style={{ height: '500px', width: '500px' }}
                    onLoad={() => setIsLoading(false)}
                    onError={() => setIsLoading(false)}
                  />
                )}
              </div>

              <div className="w-full lg:w-1/2 px-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold">{post.caption}</h2>
                    </div>
                    <div>
                      <p className="text-xl">{post.price}</p>
                    </div>
                  </div>

                  <div className="border-t border-gray-300 pt-4">
                    <p className="text-base">{post.content}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostScreen;
