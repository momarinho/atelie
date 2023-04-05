import { useState } from 'react';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';

import Login from './Login';

export default function Footer() {
  const [user] = useAuthState(auth);

  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginButtonClick = () => {
    setShowLoginModal(true);
  };

  return (
    <footer className="bg-blue-500 text-gray-400">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
        <div className="md:flex">
          <div className="flex flex-col md:mr-12 text-white">
            <h3 className="text-lg font-bold mb-2">Explore</h3>
            <Link to="/" className="mb-1">
              Início
            </Link>
            <Link to="/about" className="mb-1">
              Sobre
            </Link>
            <Link to="/contact" className="">
              Contato
            </Link>
          </div>
          <div className="flex flex-col md:mr-12 text-white">
            <h3 className="text-lg font-bold mb-2 ">Redes Sociais</h3>
            <a
              href="https://api.whatsapp.com/send?1=pt_BR&phone=5522997005478"
              target="_blank"
              rel="noreferrer"
              className="mb-1"
            >
              WhatsApp
            </a>
            <a
              href="https://www.facebook.com/ateliedasguloseimascf"
              target="_blank"
              rel="noreferrer"
              className="mb-1"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/ateliedasguloseimascf/"
              target="_blank"
              rel="noreferrer"
              className=""
            >
              Instagram
            </a>
          </div>
        </div>
        <p className="text-sm text-white mt-4 md:mt-0">
          &copy; {new Date().getFullYear()} momarinho. All rights reserved.
        </p>
        {user ? (
          ''
        ) : (
          <button
            onClick={handleLoginButtonClick}
            className="bg-blue-500 hover:bg-blue-600 text-gray-500 py-2 px-4 rounded"
          >
            Login
          </button>
        )}
      </div>

      {showLoginModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto bg-gray-900 bg-opacity-90">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white w-full max-w-md mx-auto rounded-lg shadow-lg">
              <div className="flex justify-end pt-4 pr-4">
                <button
                  className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition ease-in-out duration-150"
                  onClick={() => setShowLoginModal(false)}
                >
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6 18L18 6M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-12">
                <Login />
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
