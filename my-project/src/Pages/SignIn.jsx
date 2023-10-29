import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Replace 'your-api-endpoint' with your actual API endpoint URL
      const response = await axios.post('http://localhost:8000/user/login', formData);

      // Handle the response from your API as needed
      console.log('Log in successful:', response.data);

      // Example: Redirect to another page upon successful log-in
      // window.location.href = '/dashboard';
    } catch (error) {
      console.error('Log in failed:', error);
      // Handle log-in error, e.g., display an error message to the user
    }
  };

 

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
        <div className="w-full">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-900">Log in</h1>
            <p className="mt-2 text-gray-500">Log in below to access your account</p>
          </div>
          <div className="mt-5">
            <form onSubmit={handleFormSubmit}>
              <div className="relative mt-6">
                <input
                  // type="username"
                  name="username"
                  id="username"
                  placeholder="Username "
                  className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                  autoComplete="NA"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
                <label
                  htmlFor="username"
                  className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                >
                  username Address
                </label>
              </div>
              <div className="relative mt-6">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="peer peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <label
                  htmlFor="password"
                  className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                >
                  Password
                </label>
              </div>
              <div className="my-6">
                <button
                  type="button" // Change the button type to "button"
                  onClick={handleFormSubmit} // Add the event when clicking the button
                  className="w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none"
                >
                  Log in
                </button>
              </div>
              <p className="text-center text-sm text-gray-500">
                Don't have an account yet?
                <Link
                  to="/SignUp"
                  className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"
                >
                  Sign up
                </Link>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;