import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock , Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'; 
import axios from 'axios';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Clear previous errors
    setErrors({
      email: '',
      password: '',
      general: ''
    });
  
    // Basic validation
    if (!formData.email) {
      setErrors(prev => ({ ...prev, email: 'Email is required' }));
      return;
    }
  
    if (!formData.password) {
      setErrors(prev => ({ ...prev, password: 'Password is required' }));
      return;
    }
  
    setIsLoading(true);
    console.log("Sending login request:", formData);
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/login', {
        email: formData.email,
        password: formData.password
      });
      console.log("API Response:", response.data);
  
      // Handle successful login
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        toast.success('Login successful!');
        navigate('/dashboard');
      }
      setIsLoading(false); // Reset loading state after success
      
    } catch (error) {
      setIsLoading(false);
      
      if (error.response) {
        const { status, data } = error.response;
        
        if (status === 401) {
          setErrors({
            email: 'Invalid credentials',
            password: 'Invalid credentials',
            general: 'Invalid email or password'
          });
          toast.error('Invalid email or password');
        } else if (status === 400) {
          setErrors({
            email: data.errors?.email || '',
            password: data.errors?.password || '',
            general: data.message || 'Validation failed'
          });
          toast.error(data.message || 'Validation failed');
        } else {
          setErrors({
            general: 'An error occurred during login. Please try again.'
          });
          toast.error('Login failed. Please try again.');
        }
      } else if (error.request) {
        setErrors({
          general: 'Network error. Please check your connection.'
        });
        toast.error('Network error. Please check your connection.');
      } else {
        setErrors({
          general: 'An unexpected error occurred.'
        });
        toast.error('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100">
      <Navbar />

      <motion.section
        className="py-20 px-4 md:px-8 lg:px-16 xl:px-32 flex justify-center items-center"
        variants={fadeIn}
        initial="initial"
        animate="animate"
      >
        <motion.div
          className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
          variants={scaleIn}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-amber-900">
              Log In to <span className="text-amber-600">Bear Blogs</span>
            </h1>
            <p className="text-amber-800 mt-2">Welcome back to our community.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.general && (
              <div className="p-3 rounded-md bg-red-100 text-red-700 text-sm">
                {errors.general}
              </div>
            )}

            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-amber-500" />
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="pl-10"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-amber-500" />
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className="pl-10"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-amber-600 hover:bg-amber-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging In...
                </>
              ) : (
                'Log In'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-amber-800 text-sm">
              Don't have an account? <Link to="/signup" className="text-amber-600 hover:underline">Sign Up</Link>
            </p>
          </div>
        </motion.div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default LoginPage;