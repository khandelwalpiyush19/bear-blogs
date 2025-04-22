import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom'; // Assuming you are using react-router-dom

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="flex items-center space-x-2"
        >
          <span className="text-3xl">🐻</span>
          <h1 className="text-2xl font-bold text-amber-800">Bear Blogs</h1>
        </motion.div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-amber-800 focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="text-amber-800 hover:text-amber-600 transition-colors">Home</Link>
          <Link to="/all-blogs" className="text-amber-800 hover:text-amber-600 transition-colors">All Blogs</Link>
          <Link to="/contact" className="text-amber-800 hover:text-amber-600 transition-colors">Contact</Link>
          <Link to="/about" className="text-amber-800 hover:text-amber-600 transition-colors">About Us</Link>
        </nav>

        <div className="hidden md:flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 text-amber-100 hover:bg-amber-100 rounded-full transition-colors"
          ><Link to="/login">
            Login</Link>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors"
          > <Link to="/signup">
            Sign Up</Link>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white shadow-lg overflow-hidden"
          >
            <div className="container mx-auto px-4 py-2 flex flex-col space-y-4">
              <Link to="/" className="text-amber-800 py-2">Home</Link>
              <Link to="/blogs" className="text-amber-800 py-2">All Blogs</Link>
              <Link to="/contact" className="text-amber-800 py-2">Contact</Link>
              <Link to="/about" className="text-amber-800 py-2">About Us</Link>
              <div className="flex space-x-4 py-2">
                <button className="px-4 py-2 text-amber-800 border border-amber-800 rounded-full">Login</button>
                <button className="px-4 py-2 bg-amber-600 text-white rounded-full">Sign Up</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;