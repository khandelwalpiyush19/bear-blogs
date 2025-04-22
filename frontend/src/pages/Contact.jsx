import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone,  MessageSquare, } from 'lucide-react';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer'; 

const ContactUsPage = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: 'easeInOut' },
  };

  const scaleIn = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6, ease: 'easeInOut' },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100">
      <Navbar />

      <motion.section
        className="py-20 px-4 md:px-8 lg:px-16 xl:px-32"
        variants={fadeIn}
        initial="initial"
        animate="animate"
      >
        <div className="container mx-auto text-center">
          <motion.div variants={scaleIn}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-amber-900 mb-8">
              Get in <span className="text-amber-600">Touch</span>
            </h1>
            <p className="text-lg md:text-xl text-amber-800 mb-10 max-w-2xl mx-auto">
              We'd love to hear from you! Whether you have a question, a suggestion, or want to collaborate on wildlife
              conservation, reach out to us.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 mt-12">
            {/* Contact Information */}
            <motion.div
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              variants={fadeIn}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-amber-900 mb-6">Contact Information</h2>
              <div className="flex items-center mb-4">
                <Mail className="text-amber-600 mr-4" />
                <p className="text-amber-800">Email: contact.wildlife@bearblogs.org</p>
              </div>
              <div className="flex items-center mb-4">
                <Phone className="text-green-600 mr-4" />
                <p className="text-amber-800">Phone: +91 9876543210</p>
              </div>
              <h3 className="text-xl font-semibold text-amber-900 mt-6 mb-3">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-messenger-500 hover:opacity-80 transition-opacity">
                  <MessageSquare className="w-6 h-6" />
                </a>
              
                {/* Add more social media links as needed */}
              </div>
            </motion.div>

            {/* Inquiry Form */}
            <motion.div
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              variants={fadeIn}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-amber-900 mb-6">Send Us an Inquiry</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-amber-700 text-sm font-bold mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-amber-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-amber-700 text-sm font-bold mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-amber-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-amber-700 text-sm font-bold mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-amber-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-amber-700 text-sm font-bold mb-2">Message</label>
                  <textarea
                    id="message"
                    rows="4"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-amber-700 leading-tight focus:outline-none focus:shadow-outline"
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="bg-amber-600 text-white font-bold py-2 px-4 rounded-full hover:bg-amber-700 focus:outline-none focus:shadow-outline"
                >
                  Send Inquiry
                </motion.button>
              </form>
            </motion.div>
          </div>

          <motion.div className="mt-16 max-w-xl mx-auto text-center" variants={scaleIn} transition={{ delay: 0.6 }}>
            <h2 className="text-2xl font-bold text-amber-900 mb-6 flex items-center justify-center">
              <div className="mr-2 text-amber-600" /> Have More Questions?
            </h2>
            <p className="text-amber-800 text-sm md:text-base mb-4">
              Check out our <a href="/faq" className="text-amber-700 hover:underline">FAQ page</a> for answers to
              common inquiries.
            </p>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default ContactUsPage;