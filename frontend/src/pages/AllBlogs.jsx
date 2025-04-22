import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Image } from 'lucide-react';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import { Input } from '@/components/ui/input'; // Assuming Shadcn UI Input
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'; // Assuming Shadcn UI Card

// Dummy blog data for testing
const dummyBlogs = [
  {
    id: 1,
    title: 'The Majestic Snow Leopard: An Elusive Beauty',
    photo: 'https://via.placeholder.com/400/cccccc/000000?Text=Snow+Leopard',
    description: 'Discover the secrets of the elusive snow leopard, a creature perfectly adapted to the harsh Himalayan mountains.',
  },
  {
    id: 2,
    title: 'Protecting the Amazon: A Fight for Biodiversity',
    photo: 'https://via.placeholder.com/400/aaccbb/ffffff?Text=Amazon+Rainforest',
    description: 'Explore the critical efforts to conserve the Amazon rainforest, a vital ecosystem for global biodiversity.',
  },
  {
    id: 3,
    title: 'The Gentle Giants: Understanding Whale Migration Patterns',
    photo: 'https://via.placeholder.com/400/ddeeff/333333?Text=Humpback+Whale',
    description: 'Follow the incredible journeys of migrating whales and learn about the challenges they face in our oceans.',
  },
  {
    id: 4,
    title: 'The Plight of the Pangolin: The World\'s Most Trafficked Mammal',
    photo: 'https://via.placeholder.com/400/eeccdd/111111?Text=Pangolin',
    description: 'Learn about the devastating impact of illegal wildlife trade on pangolins and the conservation initiatives in place.',
  },
  {
    id: 5,
    title: 'Birds of Paradise: Nature\'s Most Exquisite Dancers',
    photo: 'https://via.placeholder.com/400/ffddaa/555555?Text=Bird+of+Paradise',
    description: 'Witness the stunning beauty and intricate courtship rituals of the diverse birds of paradise found in New Guinea.',
  },
];

const AllBlogsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: 'easeInOut' },
  };

  const filteredBlogs = dummyBlogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100">
      <Navbar />

      <motion.section
        className="py-20 px-4 md:px-8 lg:px-16 xl:px-32"
        variants={fadeIn}
        initial="initial"
        animate="animate"
      >
        <div className="container mx-auto">
          <motion.div className="text-center mb-10" variants={fadeIn}>
            <h1 className="text-4xl font-bold text-amber-900 mb-4">
              Explore Our <span className="text-amber-600">Wildlife Blogs</span>
            </h1>
            <p className="text-lg text-amber-800">Dive into the heart of conservation and the wonders of the animal kingdom.</p>
          </motion.div>

          <motion.div className="relative mb-8 max-w-md mx-auto" variants={fadeIn} transition={{ delay: 0.2 }}>
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-amber-500" />
            <Input
              type="text"
              placeholder="Search for blogs..."
              className="pl-10 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <motion.div key={blog.id} variants={fadeIn} transition={{ delay: 0.3 + blog.id * 0.1 }}>
                <Card className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={blog.photo}
                      alt={blog.title}
                      className="object-cover w-full h-full"
                      width={400}
                      height={300}
                    />
                  </div>
                  <CardContent className="p-6">
                    <CardTitle className="text-xl font-semibold text-amber-900 mb-2">{blog.title}</CardTitle>
                    <CardDescription className="text-amber-700 text-sm">{blog.description.substring(0, 100)}...</CardDescription>
                    <motion.button
                      className="mt-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-full transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => console.log(`Read blog: ${blog.id}`)} // Replace with actual navigation
                    >
                      Read More
                    </motion.button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredBlogs.length === 0 && (
            <motion.div className="text-center mt-10 text-amber-700" variants={fadeIn} transition={{ delay: 0.4 }}>
              <p>No blogs found matching your search term.</p>
            </motion.div>
          )}
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default AllBlogsPage;