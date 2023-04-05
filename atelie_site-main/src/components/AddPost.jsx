import { useState } from 'react';
import { db, storage, auth } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import BackButton from './buttons/BackButton';

const AddPost = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [uid, setUid] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [emphasis, setEmphasis] = useState('');

  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  const handleUpload = async (event) => {
    const files = event.target.files;

    try {
      setIsLoading(true);
      const uploadPromises = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const storageRef = ref(storage, 'images/' + file.name);
        uploadPromises.push(uploadBytes(storageRef, file));
      }

      await Promise.all(uploadPromises);

      const imageUrls = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const storageRef = ref(storage, 'images/' + file.name);
        const url = await getDownloadURL(storageRef);
        imageUrls.push(url);
      }

      console.log('Image URLs:', imageUrls);
      setImageUrl(imageUrls);
      setIsLoading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!imageUrl || imageUrl.length === 0) return;

    try {
      setIsLoading(true);
      const docRef = await addDoc(collection(db, 'posts'), {
        userPhoto: user.photoURL,
        userName: user.displayName,
        uid: user.uid,
        imageUrls: imageUrl,
        caption,
        content,
        price,
        category,
        emphasis,
        createdAt: new Date(),
      });
      console.log('New post added with ID:', docRef.id);
      setImageUrl([]);
      setCaption('');
      setContent('');
      setUid('');
      setPrice('');
      setCategory('');
      setEmphasis('');
      setIsLoading(false);
      navigate(-1);
    } catch (error) {
      console.error('Error adding post:', error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="container mx-auto mt-10 mb-10">
        <div className="mb-4 md:mb-0">
          <BackButton />
        </div>
        <h1 className="text-3xl font-bold mb-5">Add Post</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              className="block mb-2 font-bold text-gray-700"
              htmlFor="imageUrl"
            >
              Image
            </label>
            <input
              type="file"
              onChange={handleUpload}
              accept="image/*"
              multiple
              required
            />
          </div>
          <div className="mb-5">
            <label
              className="block mb-2 font-bold text-gray-700"
              htmlFor="caption"
            >
              Produto
            </label>
            <input
              className="w-full border rounded py-2 px
              -3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Nome do produto"
              value={caption}
              onChange={(event) => setCaption(event.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-bold text-gray-700">
              Descrição
            </label>
            <textarea
              className="w-full border rounded py-2 px
              -3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2 font-bold text-gray-700">Preço</label>
            <input
              className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="price"
              type="number"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2 font-bold text-gray-700">
              Categoria
            </label>
            <select
              className="w-full border mb-2 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="">Select</option>
              <option value="Biscoito">Biscoito</option>
              <option value="Alfajor">Alfajor</option>
              <option value="Tortinha">Tortinha</option>
              <option value="Bolos">Bolos</option>
              <option value="Brownie">Brownie</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 font-bold text-gray-700">
              Destaque?
            </label>
            <select
              className="w-full border mb-2 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="emphasis"
              value={emphasis}
              onChange={(event) => setEmphasis(event.target.value)}
            >
              <option value="">Select</option>
              <option value="Destaque">Destaque</option>
            </select>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={!imageUrl || isLoading}
          >
            {isLoading ? 'Adding post...' : 'Add Post'}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddPost;
