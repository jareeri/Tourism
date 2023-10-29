import React from 'react'
import {Link } from 'react-router-dom';
import '../css/Hero.css';

const Hero = () => {
  return (
    <div class="heros"><>
    <div className="h-screen bg-gray-50 flex items-center">
      <section
        className="bg-cover bg-center py-32 w-full"
        style={{ backgroundImage: 'url("https://www.alaraby.com/sites/default/files/styles/social_large/public/2022-02/GettyImages-521275152.jpg?h=65aa3d03&itok=m20nKNhC")' }}
      >
        <div className="container mx-auto text-left text-white">
          <div className="flex items-center">
            <div className="w-1/2">
              <h1 className="text-5xl font-medium mb-6">Welcome to Jordan</h1>
              <p className="text-xl mb-12">
              Jordan, a land steeped in history and natural beauty, has emerged as a captivating tourist destination in the Middle East.
              </p>
              <Link
                to="/blogs" id='demo'
                className="bg-gray-800 text-white py-4 px-12 rounded-full hover:bg-gray-700"
              >
                Add Blogs
              </Link>
            </div>
            <div className="w-1/2 pl-16">

            </div>
          </div>
        </div>
      </section>
    </div>
  </>

  </div>
  )
}

export default Hero