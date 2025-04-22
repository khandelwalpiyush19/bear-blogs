import { motion } from "framer-motion";
import { Bookmark, Edit3, FileText, Home, LayoutDashboard, LogOut, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const sidebarVariants = {
    open: { width: "280px", opacity: 1 },
    closed: { width: "80px", opacity: 1 }
  };

  const contentVariants = {
    open: { marginLeft: "280px" },
    closed: { marginLeft: "80px" }
  };

  const navItems = [
    { id: "dashboard", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { id: "create", icon: <Edit3 size={20} />, label: "Create Blog" },
    { id: "myblogs", icon: <FileText size={20} />, label: "My Blogs" },
    { id: "update", icon: <Bookmark size={20} />, label: "Update Blogs" },
    { id: "profile", icon: <User size={20} />, label: "Profile" }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardContent />;
      case "create":
        return <CreateBlogContent />;
      case "myblogs":
        return <MyBlogsContent />;
      case "update":
        return <UpdateBlogsContent />;
      case "profile":
        return <ProfileContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="flex h-screen bg-amber-50 overflow-hidden">
      {/* Sidebar */}
      <motion.div
        initial="open"
        animate={isSidebarOpen ? "open" : "closed"}
        variants={sidebarVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed h-full bg-amber-900 text-amber-50 shadow-lg z-10"
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center justify-between mb-8">
            <motion.h2 
              animate={{ opacity: isSidebarOpen ? 1 : 0 }}
              className="text-xl font-bold"
            >
              Bear Blogs
            </motion.h2>
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-full hover:bg-amber-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {isSidebarOpen ? (
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                ) : (
                  <path d="M5 12h14M12 5l7 7-7 7" />
                )}
              </svg>
            </button>
          </div>

          <nav className="flex-1">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center w-full p-3 rounded-lg transition-all ${activeTab === item.id ? "bg-amber-700" : "hover:bg-amber-800"}`}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    <motion.span
                      animate={{ opacity: isSidebarOpen ? 1 : 0, x: isSidebarOpen ? 0 : -20 }}
                      className={`ml-3 ${!isSidebarOpen && "hidden"}`}
                    >
                      {item.label}
                    </motion.span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto">
            <Link to="/" className="flex items-center p-3 rounded-lg hover:bg-amber-800">
              <Home size={20} />
              <motion.span
                animate={{ opacity: isSidebarOpen ? 1 : 0, x: isSidebarOpen ? 0 : -20 }}
                className={`ml-3 ${!isSidebarOpen && "hidden"}`}
              >
                Back to Home
              </motion.span>
            </Link>
            <button className="flex items-center w-full p-3 rounded-lg hover:bg-amber-800">
              <LogOut size={20} />
              <motion.span
                animate={{ opacity: isSidebarOpen ? 1 : 0, x: isSidebarOpen ? 0 : -20 }}
                className={`ml-3 ${!isSidebarOpen && "hidden"}`}
              >
                Logout
              </motion.span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.main
        initial="open"
        animate={isSidebarOpen ? "open" : "closed"}
        variants={contentVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="flex-1 p-6 overflow-y-auto"
      >
        {renderContent()}
      </motion.main>
    </div>
  );
};

// Content Components
const DashboardContent = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-xl shadow-md p-6"
  >
    <h2 className="text-2xl font-bold text-amber-900 mb-6">Dashboard Overview</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-amber-100 p-6 rounded-lg border border-amber-200">
        <h3 className="font-semibold text-amber-800">Total Blogs</h3>
        <p className="text-3xl font-bold text-amber-600 mt-2">24</p>
      </div>
      <div className="bg-amber-100 p-6 rounded-lg border border-amber-200">
        <h3 className="font-semibold text-amber-800">Drafts</h3>
        <p className="text-3xl font-bold text-amber-600 mt-2">3</p>
      </div>
      <div className="bg-amber-100 p-6 rounded-lg border border-amber-200">
        <h3 className="font-semibold text-amber-800">Published</h3>
        <p className="text-3xl font-bold text-amber-600 mt-2">21</p>
      </div>
    </div>
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-amber-800 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div key={item} className="p-4 border-b border-amber-100 last:border-0">
            <p className="text-amber-700">You published "Getting Started with Bear Blogs"</p>
            <p className="text-sm text-amber-500 mt-1">2 days ago</p>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

const CreateBlogContent = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-xl shadow-md p-6"
  >
    <h2 className="text-2xl font-bold text-amber-900 mb-6">Create New Blog</h2>
    <form className="space-y-6">
      <div>
        <label className="block text-amber-800 font-medium mb-2">Title</label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          placeholder="Enter blog title"
        />
      </div>
      <div>
        <label className="block text-amber-800 font-medium mb-2">Content</label>
        <textarea
          rows="10"
          className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          placeholder="Write your blog content here..."
        ></textarea>
      </div>
      <div>
        <label className="block text-amber-800 font-medium mb-2">Featured Image</label>
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-amber-300 border-dashed rounded-lg cursor-pointer bg-amber-50 hover:bg-amber-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-amber-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
              </svg>
              <p className="mb-2 text-sm text-amber-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>
        </div>
      </div>
      <div className="flex justify-end space-x-4">
        <button className="px-6 py-2 border border-amber-300 text-amber-700 rounded-lg hover:bg-amber-100">
          Save Draft
        </button>
        <button className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
          Publish Blog
        </button>
      </div>
    </form>
  </motion.div>
);

const MyBlogsContent = () => (
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

const UpdateBlogsContent = () => (
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

const ProfileContent = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-xl shadow-md p-6"
  >
    <h2 className="text-2xl font-bold text-amber-900 mb-6">Profile Settings</h2>
    <div className="flex flex-col md:flex-row gap-6">
      <div className="md:w-1/3">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full bg-amber-200 mb-4 overflow-hidden border-4 border-amber-300">
            <div className="w-full h-full flex items-center justify-center text-amber-600">
              <User size={48} />
            </div>
          </div>
          <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 text-sm">
            Change Photo
          </button>
          <div className="mt-6 w-full">
            <h3 className="font-semibold text-amber-800 mb-3">Account Info</h3>
            <div className="space-y-2">
              <p className="text-sm text-amber-700"><span className="font-medium">Joined:</span> {new Date().toLocaleDateString()}</p>
              <p className="text-sm text-amber-700"><span className="font-medium">Blogs:</span> 24</p>
              <p className="text-sm text-amber-700"><span className="font-medium">Last Active:</span> Today</p>
            </div>
          </div>
        </div>
      </div>
      <div className="md:w-2/3">
        <form className="space-y-6">
          <div>
            <label className="block text-amber-800 font-medium mb-2">Full Name</label>
            <input
              type="text"
              defaultValue="John Doe"
              className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
          <div>
            <label className="block text-amber-800 font-medium mb-2">Email</label>
            <input
              type="email"
              defaultValue="john@example.com"
              className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
          <div>
            <label className="block text-amber-800 font-medium mb-2">Bio</label>
            <textarea
              rows="4"
              className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              defaultValue="Writer and blogger passionate about technology and design."
            ></textarea>
          </div>
          <div>
            <label className="block text-amber-800 font-medium mb-2">Change Password</label>
            <div className="space-y-3">
              <input
                type="password"
                placeholder="Current Password"
                className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
              <input
                type="password"
                placeholder="New Password"
                className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  </motion.div>
);

export default Dashboard;