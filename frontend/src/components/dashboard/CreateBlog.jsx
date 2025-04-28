import { motion } from "framer-motion";
import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [blog, setBlog] = useState({
    title: '',
    description: ''
  });
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      // 1. Get the JWT token from storage
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Please login first');
        navigate('/login');
        return;
      }

      // 2. Make the authenticated request
      const { data } = await axios.post('http://localhost:3000/api/v1/blog', blog, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Add JWT token
        },
      });

      // 3. Handle success
      toast.success(data.message || 'Blog created successfully!');
      setBlog({
        title: '',
        description: ''
      });
      
      // Optional: Redirect after creation
      // navigate('/blogs');

    } catch (error) {
      console.error('Error creating blog:', error);
      
      // Handle 401 Unauthorized (token expired/invalid)
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.');
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        // Show other errors
        toast.error(error.response?.data?.message || 'Failed to create blog');
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-md p-6"
    >
      <h2 className="text-2xl font-bold text-amber-900 mb-6">Create New Blog</h2>
      <form className="space-y-6" onSubmit={onSubmitHandler}> {/* Changed to onSubmit */}
        <div>
          <label className="block text-amber-800 font-medium mb-2">Title</label>
          <input
            type="text"
            value={blog.title}
            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
            className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            placeholder="Enter blog title"
          />
        </div>
        <div>
          <label className="block text-amber-800 font-medium mb-2">Content</label>
          <textarea
            rows="10"
            value={blog.description}
            onChange={(e) => setBlog({ ...blog, description: e.target.value })}
            className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            placeholder="Write your blog content here..."
          ></textarea>
        </div>
        <div>
          <label className="block text-amber-800 font-medium mb-2">
            Featured Image
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-amber-300 border-dashed rounded-lg cursor-pointer bg-amber-50 hover:bg-amber-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-amber-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-amber-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <button className="px-6 py-2 border border-amber-300 text-amber-700 rounded-lg hover:bg-amber-100">
            Save Draft
          </button>
          <button 
          type="submit"
          className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
            Publish Blog
          </button>
        </div>
      
      </form>
    </motion.div>
  );
};

export default CreateBlog;