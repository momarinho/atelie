import React from 'react';

import logo from '../assets/logo.png';

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-wrap">
      <div className="w-full md:w-1/2 p-10 flex items-center justify-center">
        <div>
          <h1 className="text-3xl font-bold my-6">
            Sobre o Ateliê
          </h1>
          <h3 className="text-2xl text-gray-900 mb-4">
            Olá, somos o Ateliê das Guloseimas!
          </h3>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            Somos uma empresa familiar especializada em biscoitos, bolos e
            guloseimas artesanais. Trabalhamos com biscoitos caseiros doces e
            salgados, bolos, alfajores, brownies, tortinhas de leite condensado
            e biscoitos decorados.
          </p>
          <p className="text-gray-600 font-bold mt-6">
            Tradição familiar. Muito amor em tudo o que fazemos!
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/2 p-10 flex flex-col items-center justify-center">
        <img src={logo} alt="Ateliê das Guloseimas" className="mx-auto w-60" />
        <p className="text-gray-600">
            Desde 2011 adoçando seus dias.
          </p>
      </div>
    </div>
  );
};

export default About;
