import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center mb-4">
      <button
        className="bg-white border border-gray-300 rounded-full shadow-lg text-gray-500 hover:text-gray-700 focus:outline-none focus:ring focus:border-blue-500 transition-colors duration-300 px-4 py-2 mr-4"
        onClick={() => navigate(-1)}
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
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Voltar
      </button>
    </div>
  );
};

export default BackButton;
