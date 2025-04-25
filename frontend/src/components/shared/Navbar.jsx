import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check auth status using cookies
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Make a request to your authentication check endpoint
        const response = await axios.get('/api/auth/check-auth-status', {
          withCredentials: true // Important for sending cookies with the request
        });
        
        setIsLoggedIn(response.data.isAuthenticated);
      } catch (error) {
        console.error('Auth check error:', error);
        setIsLoggedIn(false);
      }
    };

    // Initial check
    checkAuthStatus();

    // Set up an interval to periodically check auth status
    // This is necessary because we can't directly listen for cookie changes
    const authCheckInterval = setInterval(checkAuthStatus, 5 * 60 * 1000); // Check every 5 minutes
    
    return () => {
      clearInterval(authCheckInterval);
    };
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      const response = await axios.post('/api/auth/logout', {}, {
        withCredentials: true // Important for sending cookies with the request
      });
      
      if (response.data.success) {
        setIsLoggedIn(false);
        navigate('/login');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Animated logo component
  const Logo = () => (
    <motion.div 
      initial={{ scale: 0.8 }}
      animate={{ 
        scale: 1,
        transition: { 
          type: 'spring', 
          stiffness: 300,
          damping: 10
        }
      }}
      className="flex items-center space-x-2 cursor-pointer"
    >
      <motion.span
        animate={{
          rotate: [0, 5, -5, 0],
          y: [0, -3, 0, 3, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="text-3xl"
      >
        🐻
      </motion.span>
      
      <motion.h1 
        className="text-2xl font-bold text-amber-800"
        animate={{
          scale: [1, 1.02, 1],
          textShadow: ["0 0 0px rgba(146,64,14,0)", "0 0 5px rgba(146,64,14,0.2)", "0 0 0px rgba(146,64,14,0)"]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 2
        }}
      >
        Bear Blogs
      </motion.h1>
    </motion.div>
  );

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/">
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="text-amber-800 hover:text-amber-600 transition-colors">Home</Link>
          <Link to="/all-blogs" className="text-amber-800 hover:text-amber-600 transition-colors">All Blogs</Link>
          <Link to="/contact" className="text-amber-800 hover:text-amber-600 transition-colors">Contact</Link>
          <Link to="/about" className="text-amber-800 hover:text-amber-600 transition-colors">About Us</Link>
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex space-x-4">
          {isLoggedIn ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors"
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </motion.button>
          ) : (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 text-amber-800 border border-amber-800 rounded-full hover:bg-amber-50 transition-colors"
                onClick={() => navigate('/login')}
              >
                Login
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors"
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </motion.button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-amber-800 focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg overflow-hidden"
          >
            <div className="container mx-auto px-4 py-2 flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-amber-800 py-2 hover:text-amber-600" 
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/all-blogs" 
                className="text-amber-800 py-2 hover:text-amber-600" 
                onClick={() => setIsMenuOpen(false)}
              >
                All Blogs
              </Link>
              <Link 
                to="/contact" 
                className="text-amber-800 py-2 hover:text-amber-600" 
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                to="/about" 
                className="text-amber-800 py-2 hover:text-amber-600" 
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              
              <div className="py-2">
                {isLoggedIn ? (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-4 py-2 bg-amber-600 text-white rounded-full"
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate('/dashboard');
                    }}
                  >
                    Dashboard
                  </motion.button>
                ) : (
                  <div className="flex space-x-4">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="w-1/2 px-4 py-2 text-amber-800 border border-amber-800 rounded-full"
                      onClick={() => {
                        setIsMenuOpen(false);
                        navigate('/login');
                      }}
                    >
                      Login
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="w-1/2 px-4 py-2 bg-amber-600 text-white rounded-full"
                      onClick={() => {
                        setIsMenuOpen(false);
                        navigate('/signup');
                      }}
                    >
                      Sign Up
                    </motion.button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;