import { motion } from "framer-motion";
import { Bookmark, Edit3, FileText, Home, LayoutDashboard, LogOut, User } from "lucide-react";

const UpdateBlogs = () => (
 
 
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-xl shadow-md p-6"
  >
    <h2 className="text-2xl font-bold text-amber-900 mb-6">Update Blogs</h2>
    <div className="space-y-6">
      {[1, 2, 3].map((item) => (
        <div key={item} className="p-4 border border-amber-200 rounded-lg">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-32 h-24 bg-amber-200 rounded-lg overflow-hidden">
              <div className="w-full h-full bg-amber-300 flex items-center justify-center text-amber-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-amber-800">Blog Post Title {item}</h3>
              <p className="text-sm text-amber-600 mt-1">Last updated: {new Date().toLocaleDateString()}</p>
              <p className="text-amber-700 mt-2 line-clamp-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.
              </p>
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-3">
            <button className="px-4 py-2 border border-amber-300 text-amber-700 rounded-lg hover:bg-amber-100 text-sm">
              View Stats
            </button>
            <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 text-sm">
              Edit Post
            </button>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
 
);

export default UpdateBlogs;