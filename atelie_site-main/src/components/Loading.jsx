import React from 'react';
import logo01 from '../assets/01.png';
import logo02 from '../assets/02.png';

const Loading = () => {
  const images = [logo01, logo02];

  const randomIndex = Math.floor(Math.random() * images.length);
  const randomImage = images[randomIndex];

  return (
    <div className="flex justify-center bg-transparent transition-opacity duration-200">
      <div className="w-1/12 h-1/12 flex flex-col justify-center items-center">
        <p className="text-lg font-semibold mb-4 animate-pulse">Carregando...</p>
        <img
          src={randomImage}
          alt="Loading"
          className="max-w-full max-h-full animate-pulse"
        />
      </div>
    </div>
  );
};

export default Loading;
