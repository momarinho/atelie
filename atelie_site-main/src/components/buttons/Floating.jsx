import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Floating() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, [menuRef]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={toggleMenu}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-6 rounded-full"
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
      {isOpen && (
        <div
          className="absolute bottom-14 right-4 bg-white border border-gray-200 rounded-md p-4"
          ref={menuRef}
          onClick={() => window.scrollTo(0, 0)}
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
          <button
            className="block py-2 px-4 text-gray-700 hover:bg-gray-100"
            onClick={() => navigate(-1)}
          >
            <svg
              className="w-4 h-4"
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
            <p>Voltar</p>
          </button>
        </div>
      )}
    </div>
  );
}

export default Floating;
