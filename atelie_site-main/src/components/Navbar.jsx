import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import logo from '../assets/logo.png';
import Drawer from './Drawer';

const Navbar = () => {
  const [user] = useAuthState(auth);

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef(null);

  const handleLogout = async () => {
    await auth.signOut();
    setShowLogoutModal(false);
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, [menuRef]);

  return (
    <nav className="bg-blue-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center z-50">
            <Drawer />
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
              <img
                src={logo}
                alt="logo"
                className="rounded-full bg-white ml-4 cursor-pointer w-20 h-20 shadow-2xl sm:w-20 sm:h-20 md:w-20 md:h-20 lg:w-20 lg:h-20 "
              />
            </Link>
          </div>

          <div className="ml-10 flex items-baseline space-x-4">
            {user && (
              <div className="flex justify-around">
                <button
                  className="flex items-center ml-4 cursor-pointer text-blue-400 text-xl bg-white hover:bg-gray-100 py-2 px-4 rounded-full"
                  onClick={() => setShowMenu(!showMenu)}
                >
                  Adicionar
                  {showMenu && (
                    <div
                      ref={menuRef}
                      className="right-16 top-12 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20"
                    >
                      <Link
                        to="/add"
                        className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white w-full text-left"
                      >
                        Add New Post
                      </Link>
                      <button
                        className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white w-full text-left"
                        onClick={() => setShowLogoutModal(true)}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </button>
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <Link
              to="/search"
              className="flex items-center ml-4 cursor-pointer text-blue-400 text-xl bg-white hover:bg-gray-100 py-2 px-4 rounded-full"
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
            </Link>
          </div>
        </div>
      </div>

      {showLogoutModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto bg-gray-900 bg-opacity-90">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">
                Logout Confirmation
              </h2>
              <p className="mb-4">Are you sure you want to logout?</p>
              <div className="flex justify-end">
                <button
                  className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
                  onClick={() => setShowLogoutModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
