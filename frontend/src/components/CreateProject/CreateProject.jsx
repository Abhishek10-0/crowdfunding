import React, { useState } from 'react';
import axios from 'axios';

const CreateProject = () => {
  const [formData, setFormData] = useState({
    name: '',
    duration: '',
    description: '',
    goal: '',
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('duration', formData.duration);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('goal', formData.goal);
    formDataToSend.append('image', image);

    try {
      const response = await axios.post('http://localhost:5001/api/projects', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Project created successfully!');
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error creating project:', error.message);
      alert('Failed to create project.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">Project Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Duration (days):</label>
        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Goal Amount:</label>
        <input
          type="number"
          name="goal"
          value={formData.goal}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Upload Image:</label>
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          required
          className="mt-1 block w-full text-gray-600 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Create Project
      </button>
    </form>
  );
};

export default CreateProject;
