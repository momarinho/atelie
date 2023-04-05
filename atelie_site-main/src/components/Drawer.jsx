import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Drawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsDrawerOpen(false);
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, [menuRef]);

  return (
    <div className="">
      <button
        onClick={toggleDrawer}
        className="text-white font-bold p-6 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M3 6a2 2 0 012-2h10a2 2 0 110 4H5a2 2 0 01-2-2zM5 11a2 2 0 100 4h10a2 2 0 100-4H5z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isDrawerOpen && (
        <div
          className="fixed top-0 left-0 h-full w-64 bg-white border border-gray-200 rounded-md p-4 transition-all duration-300 ease-in-out"
          ref={menuRef}
          onClick={() => {
            setIsDrawerOpen(false);
            window.scrollTo(0, 0);
          }}
        >
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900"
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
          <div
            className="mt-8"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            <Link
              to="/"
              className="block py-2 px-4 text-gray-700 hover:bg-gray-100"
            >
              Início
            </Link>
            <Link
              to="/contact"
              className="block py-2 px-4 text-gray-700 hover:bg-gray-100"
            >
              Contato
            </Link>
            <Link
              to="/about"
              className="block py-2 px-4 text-gray-700 hover:bg-gray-100"
            >
              Sobre
            </Link>
            <Link
              to="/menu"
              className="block py-2 px-4 text-gray-700 hover:bg-gray-100"
            >
              Tabela
            </Link>
          </div>
          <button
            className="absolute bottom-4 left-4 py-2 px-4 text-gray-700 hover:bg-gray-100"
            onClick={() => navigate(-1)}
          >
            <svg
              className="w-4 h-4 inline-block mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span className="inline-block">Voltar</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default Drawer;
