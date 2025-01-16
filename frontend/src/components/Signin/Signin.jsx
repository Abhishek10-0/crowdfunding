import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For navigation

  const handleSignIn = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
  
    try {
      const response = await axios.post('http://localhost:5001/api/users/signin', {
        email,
        password,
      });
  
      // Log response for debugging purposes
      console.log('Login Response:', response);
  
      // Save the JWT token in localStorage
      localStorage.setItem('token', response.data.token);
  
      // Show success message
      alert('Login Successful!');
  
      // Redirect the user to the home page after successful login
      navigate('/home');
    } catch (err) {
      // Log the full error object for debugging purposes
      console.error('Sign-In Error:', err);
  
      // Check if error response is present
      const errorMessage = err.response?.data?.message || 'Something went wrong!';
      
      // Set the error message to display in the UI
      setError(errorMessage);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Sign In</h2>
        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
