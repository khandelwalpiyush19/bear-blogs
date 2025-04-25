import { motion } from "framer-motion";
import { Bookmark, Edit3, FileText, Home, LayoutDashboard, LogOut, User } from "lucide-react";

const MyBlogs = () => (

   
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-xl shadow-md p-6"
  >
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-amber-900">My Blogs</h2>
      <div className="relative">
        <select className="appearance-none bg-amber-100 border border-amber-300 text-amber-800 py-2 pl-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500">
          <option>All Blogs</option>
          <option>Published</option>
          <option>Drafts</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-amber-700">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </div>
    </div>
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="p-4 border border-amber-200 rounded-lg hover:bg-amber-50 transition-colors">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-amber-800">Getting Started with Bear Blogs - Part {item}</h3>
              <p className="text-sm text-amber-600 mt-1">Published on {new Date().toLocaleDateString()}</p>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 text-amber-600 hover:bg-amber-100 rounded-full">
                <Edit3 size={16} />
              </button>
              <button className="p-2 text-red-500 hover:bg-red-50 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          </div>
          <p className="text-amber-700 mt-2 line-clamp-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.
          </p>
          <div className="flex mt-3 space-x-2">
            <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">Technology</span>
            <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">Guide</span>
          </div>
        </div>
      ))}
    </div>
    <div className="mt-6 flex justify-center">
      <button className="px-4 py-2 border border-amber-300 text-amber-700 rounded-lg hover:bg-amber-100">
        Load More
      </button>
    </div>
  </motion.div>
);

  

export default MyBlogs;