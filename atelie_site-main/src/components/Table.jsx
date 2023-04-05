import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

import { auth, db } from '../config/firebase';

const Table = () => {
  const [user] = useAuthState(auth);

  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');

  const handleAddNewItem = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(db, 'products'), {
        name: newItemName,
        price: newItemPrice,
      });
      setNewItemName('');
      setNewItemPrice('');
    } catch (error) {
      console.error('Error adding new item:', error);
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const Products = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const collectionRef = collection(db, 'products');
      const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });
        setProducts(data);
        setIsLoading(false);
      });
      return () => unsubscribe();
    }, []);

    return { products, isLoading };
  };

  const { products, isLoading } = Products();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  products.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <div className="flex flex-col items-center min-h-screen mt-8">
        <h1 className="text-3xl font-bold mb-8">Tabela</h1>

        {user ? (
          <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-lg font-bold mb-2">Adicionar Novo Item</h2>
            <form onSubmit={handleAddNewItem} className="flex flex-col">
              <label htmlFor="newItemName" className="mb-2">
                Nome do Produto:
              </label>
              <input
                id="newItemName"
                type="text"
                value={newItemName}
                onChange={(event) => setNewItemName(event.target.value)}
                className="border border-gray-300 rounded-lg p-2 mb-4"
              />

              <label htmlFor="newItemPrice" className="mb-2">
                Preço:
              </label>
              <input
                id="newItemPrice"
                type="text"
                value={newItemPrice}
                onChange={(event) => setNewItemPrice(event.target.value)}
                className="border border-gray-300 rounded-lg p-2 mb-4"
              />

              <button
                type="submit"
                className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              >
                Adicionar Item
              </button>
            </form>
          </div>
        ) : null}

        <hr className="w-full max-w-md mb-8" />

        <table className="table-auto w-full max-w-md">
          <thead>
            <tr>
              <th className="px-4 py-2">Produto</th>
              <th className="px-4 py-2">Preço</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="border px-4 py-2 text-center">{product.name}</td>
                <td className="border px-4 py-2 text-center">
                  R$ {product.price}
                </td>
                {user && (
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() => handleRemoveItem(product.id)}
                      className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-12 text-center border p-4">
        <p className="mb-2">
          <span className="text-red-500 font-bold">Obs.</span>: Alguns itens
          possuem pedido mínimo...
        </p>
        <p className="">
          Para mais informações entre em contato conosco:{' '}
          <span className="mt-2 text-blue-700">
            <Link
              to="/contact"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              Contato
            </Link>
          </span>
        </p>
      </div>
    </>
  );
};

export default Table;
