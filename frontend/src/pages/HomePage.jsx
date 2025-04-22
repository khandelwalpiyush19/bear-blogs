import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';

const HomePage = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const features = [
    {
      title: "Write Beautifully",
      description: "Our markdown editor makes writing a pleasure with live previews and formatting shortcuts.",
      icon: "✍️"
    },
    {
      title: "Engage Your Readers",
      description: "Built-in commenting and reaction system helps you connect with your audience.",
      icon: "💬"
    },
    {
      title: "Grow Your Audience",
      description: "SEO tools and social sharing help your content reach more people.",
      icon: "📈"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 mb-10 md:mb-0"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-amber-900 mb-6">
              Write, Share, <span className="text-amber-600">Grow</span>
            </h1>
            <p className="text-lg text-amber-800 mb-8">
              Bear Blogs is the perfect platform for writers who want to focus on their content while we handle the rest.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors shadow-lg"
              >
                Start Writing for Free
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 border border-amber-600 text-amber-600 rounded-full hover:bg-amber-50 transition-colors"
              >
                See How It Works
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-1/2 relative"
          >
            <div className="relative max-w-md mx-auto">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-amber-200 rounded-full opacity-30 animate-pulse"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-300 rounded-full opacity-20 animate-pulse delay-300"></div>
              <motion.div
                whileHover={{ rotate: 2 }}
                className="relative bg-white p-6 rounded-2xl shadow-xl border border-amber-100"
              >
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg mb-4">
                  <div className="h-4 bg-amber-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-amber-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-amber-200 rounded w-5/6"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-100 rounded w-full"></div>
                  <div className="h-4 bg-gray-100 rounded w-11/12"></div>
                  <div className="h-4 bg-gray-100 rounded w-10/12"></div>
                </div>
                <div className="mt-6 flex justify-between">
                  <div className="flex space-x-2">
                    <div className="w-8 h-8 rounded-full bg-amber-200"></div>
                    <div className="w-8 h-8 rounded-full bg-amber-300"></div>
                  </div>
                  <div className="text-sm text-amber-600">Just now</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-amber-600/10">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center text-amber-900 mb-16"
          >
            Why Choose Bear Blogs?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow ${currentFeature === index ? 'ring-2 ring-amber-500' : ''}`}
                onMouseEnter={() => setCurrentFeature(index)}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-amber-900 mb-2">{feature.title}</h3>
                <p className="text-amber-800">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentFeature(index)}
                className={`w-3 h-3 rounded-full ${currentFeature === index ? 'bg-amber-600' : 'bg-amber-300'}`}
                aria-label={`Go to feature ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-amber-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Ready to Start Your Blogging Journey?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl mb-8 max-w-2xl mx-auto"
          >
            Join thousands of writers who are already sharing their stories with the world.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-amber-600 rounded-full font-bold hover:bg-amber-50 transition-colors shadow-lg"
            >
              Get Started - It's Free
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;