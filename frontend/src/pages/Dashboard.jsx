import { motion } from "framer-motion";
import { Bookmark, Edit3, FileText, Home, LayoutDashboard, LogOut, User } from "lucide-react";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const DashboardLayout = () => {
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
    { id: "", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { id: "create", icon: <Edit3 size={20} />, label: "Create Blog" },
    { id: "myblogs", icon: <FileText size={20} />, label: "My Blogs" },
    { id: "update", icon: <Bookmark size={20} />, label: "Update Blogs" },
    { id: "profile", icon: <User size={20} />, label: "Profile" }
  ];

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
                  <Link
                    to={`/dashboard/${item.id}`}
                    className={`flex items-center w-full p-3 rounded-lg transition-all ${activeTab === item.id ? "bg-amber-700" : "hover:bg-amber-800"}`}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    <motion.span
                      animate={{ opacity: isSidebarOpen ? 1 : 0, x: isSidebarOpen ? 0 : -20 }}
                      className={`ml-3 ${!isSidebarOpen && "hidden"}`}
                    >
                      {item.label}
                    </motion.span>
                  </Link>
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
        <Outlet />
      </motion.main>
    </div>
  );
};

export default DashboardLayout;