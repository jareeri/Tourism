import React, { useState } from 'react';
import axios from 'axios';


const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',

  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/user/register', formData);
      console.log('Sign up successful:', response.data);

      // Handle successful sign-up, e.g., store user data in state or local storage, or redirect to another page
    } catch (error) {
      console.error('Sign up failed:', error);

      // Handle sign-up error, e.g., display an error message to the user
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
        <h1 className="text-3xl font-semibold text-gray-900">Sign up</h1>
        <p className="mt-2 text-gray-500">Create an account</p>
        <div>
          <form className="mt-10" method="POST">
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="fullname"
              placeholder="Full Name"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button
              type="button" // Change the button type to "button"
              onClick={handleFormSubmit} // Add the event when clicking the button
              className="w-full py-3 mt-10 bg-gray-800 rounded-sm
                font-medium text-white uppercase
                focus:outline-none hover:bg-gray-700 hover:shadow-none"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;