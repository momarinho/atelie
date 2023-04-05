import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.reload();
    } catch (error) {
      console.error('Error signing in with email/password', error);
      setErrorMessage('Incorrect email or password');
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 px-4">
      <h2 className="text-3xl font-bold mb-4 text-black">Login</h2>

      <form onSubmit={handleLogin} className="flex flex-col space-y-6">
        <label htmlFor="email" className="font-bold">
          Email:
          <input type="email" id="email" className="border w-full" />
        </label>

        <label htmlFor="password" className="font-bold">
          Password:
          <input type="password" id="password" className="border w-full" />
        </label>

        {errorMessage && <div className="text-red-500">{errorMessage}</div>}

        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
