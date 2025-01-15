import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send data to backend API endpoint (no database logic here)
      const response = await axios.post("http://localhost:5001/api/users/signup", formData);
      alert("Registration successful!");
      console.log(response.data);
    } catch (error) {
      alert("Registration failed!");
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 mb-6 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
