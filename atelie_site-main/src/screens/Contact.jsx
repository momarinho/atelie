import React from 'react';

const Contact = () => {
  return (
    <div className="h-screen flex flex-col  items-center mt-8">
      <h1 className="text-3xl font-bold text-center">
        Entre em contato conosco...
      </h1>
      <div className="flex flex-col justify-center items-center">
        <p className="text-lg text-gray-600 mb-4 font-bold">
          Você pode nos encontrar:
        </p>
        <ul className="text-lg text-gray-600 mb-4 list-disc">
          <li>Email: biscoitoscaseiros.rj@gmail.com</li>
          <li>Número: 22-997005478</li>
          <li>Endereço: Rua Duarte da Costa, 284</li>
        </ul>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h3 className="text-lg text-gray-600 mt-8 mb-2 font-bold">
          Redes Sociais:
        </h3>
        <div className="flex flex-wrap justify-center">
          <a
            href="https://api.whatsapp.com/send?1=pt_BR&phone=5522997005478"
            target="_blank"
            rel="noreferrer"
            className="mb-4 inline-block mr-4 text-lg bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out"
          >
            WhatsApp
          </a>
          <a
            href="https://www.facebook.com/ateliedasguloseimascf"
            target="_blank"
            rel="noreferrer"
            className="mb-4 inline-block mr-4 text-lg bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out"
          >
            Facebook
          </a>
          <a
            href="https://www.instagram.com/ateliedasguloseimascf/"
            target="_blank"
            rel="noreferrer"
            className="mb-4 inline-block mr-4 text-lg bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out"
          >
            Instagram
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
