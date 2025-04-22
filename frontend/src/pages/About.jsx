import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Leaf, MessageSquare, Coins } from 'lucide-react';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';

const About = () => {
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
              About <span className="text-amber-600">Bear Blogs</span>
            </h1>
            <p className="text-lg md:text-xl text-amber-800 mb-10 max-w-2xl mx-auto">
              More than just a blogging platform, Bear Blogs is a community driven by a profound mission:
              to <span className="font-semibold text-amber-700">protect the precious wildlife</span> facing extinction.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {/* Our Mission */}
            <motion.div
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center"
              variants={fadeIn}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.2 }}
            >
              <ShieldCheck className="text-amber-600 text-4xl mb-4" />
              <h3 className="text-xl font-bold text-amber-900 mb-2">Our Pledge</h3>
              <p className="text-amber-800 text-sm md:text-base">
                We are dedicated to raising global awareness about the urgent issue of wildlife extinction and actively
                supporting conservation efforts.
              </p>
            </motion.div>

            {/* Reaching the World */}
            <motion.div
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center"
              variants={fadeIn}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.4 }}
            >
              <Leaf className="text-green-600 text-4xl mb-4" />
              <h3 className="text-xl font-bold text-amber-900 mb-2">Spreading the Word</h3>
              <p className="text-amber-800 text-sm md:text-base">
                Through our engaging blogs, we aim to reach a broad audience, circulating vital news, stories, and
                insights about the challenges and triumphs in wildlife conservation.
              </p>
            </motion.div>

            {/* Funding Conservation */}
            <motion.div
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center"
              variants={fadeIn}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.6 }}
            >
              <Coins className="text-yellow-600 text-4xl mb-4" />
              <h3 className="text-xl font-bold text-amber-900 mb-2">Fueling Action</h3>
              <p className="text-amber-800 text-sm md:text-base">
                A core part of our mission is to collect funds that directly support crucial on-the-ground operations
                dedicated to protecting endangered species and their habitats.
              </p>
            </motion.div>

            {/* Freedom of Speech */}
            <motion.div
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center"
              variants={fadeIn}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.8 }}
            >
              <MessageSquare className="text-blue-600 text-4xl mb-4" />
              <h3 className="text-xl font-bold text-amber-900 mb-2">Your Voice Matters</h3>
              <p className="text-amber-800 text-sm md:text-base">
                We believe in the power of diverse voices. Bear Blogs provides a platform where writers can share their
                perspectives freely, contributing to a richer understanding of the world around us.
              </p>
            </motion.div>
          </div>

          <motion.div className="mt-16 max-w-xl mx-auto" variants={scaleIn} transition={{ delay: 1 }}>
            <h2 className="text-2xl font-bold text-amber-900 mb-6">Join Our Movement</h2>
            <p className="text-amber-800 text-sm md:text-base mb-4">
              Whether you're a passionate writer, a wildlife enthusiast, or simply someone who cares about our planet,
              Bear Blogs offers a way to get involved.
            </p>
            <div className="flex justify-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-amber-600 text-white rounded-full font-bold hover:bg-amber-700 transition-colors shadow-md"
              >
                Support Our Cause
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 border border-amber-600 text-amber-600 rounded-full hover:bg-amber-50 transition-colors"
              >
                Start Writing
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default About;