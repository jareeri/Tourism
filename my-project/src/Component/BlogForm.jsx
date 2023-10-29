import React, { useState } from 'react';
import axios from 'axios';

function BlogForm() {
  const [formData, setFormData] = useState({
    title: '',
    blogimg: '',
    city: '',
    content: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/blog/addblogs', formData);
      console.log('Blog created:', response.data);
      // Optionally, you can redirect to the newly created blog or update the blogs list.
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  
  return (
    <div className="flex items-center justify-center h-screen">
    <div class="BlogForm"> 
      <h2>Create a New Blog</h2>
      <form class="bf" onSubmit={handleSubmit}>
        <div class="input">
          <label htmlFor="title">Blog Title:</label>
          <input
            type="text"
            id="input-blog"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="blogimg">blogimg URL:</label>
          <input
            type="text"
            id="input-blog"
            name="blogimg"
            value={formData.blogimg}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="input-blog"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Blog content:</label>
          <textarea
            id="input-blog"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="button" // Change the button type to "button"
          onClick={handleSubmit} // Add the event when clicking the button
        >
          Create Blog
        </button>
      </form>
    </div></div>
  );
}

export default BlogForm;
