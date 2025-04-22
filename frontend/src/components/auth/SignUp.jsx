import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, CheckCircle, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast'; // For showing notifications

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    general: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
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

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      general: ''
    };

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    console.log('Request payload:', {
      name: formData.fullName,
      email: formData.email,
      password: formData.password
    });
    
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/register', {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password
      });
      console.log(response)

      // Handle successful signup
      setSignUpSuccess(true);
      toast.success('Account created successfully!');
      
      // Optionally, automatically log the user in or redirect to login page
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      setIsLoading(false);
      
      if (error.response) {
        // The request was made and the server responded with a status code
        const { status, data } = error.response;
        
        if (status === 409) {
          setErrors(prev => ({
            ...prev,
            email: data.message || 'Email is already in use'
          }));
        } else if (status === 400) {
          // Handle validation errors from server
          if (data.errors) {
            setErrors(prev => ({
              ...prev,
              ...data.errors
            }));
          } else {
            setErrors(prev => ({
              ...prev,
              general: data.message || 'Invalid data provided'
            }));
          }
        } else {
          setErrors(prev => ({
            ...prev,
            general: 'An error occurred during signup. Please try again.'
          }));
        }
      } else if (error.request) {
        // The request was made but no response was received
        setErrors(prev => ({
          ...prev,
          general: 'Network error. Please check your connection.'
        }));
      } else {
        // Something happened in setting up the request
        setErrors(prev => ({
          ...prev,
          general: 'An unexpected error occurred.'
        }));
      }
      
      toast.error(errors.general || 'Signup failed. Please try again.');
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
              Sign Up for <span className="text-amber-600">Bear Blogs</span>
            </h1>
            <p className="text-amber-800 mt-2">Join our community and share your voice.</p>
          </div>

          {signUpSuccess ? (
            <div className="text-center p-6 rounded-md bg-green-100 text-green-700">
              <CheckCircle className="w-10 h-10 mx-auto mb-4" />
              <p className="font-semibold">Sign Up Successful!</p>
              <p>You can now proceed to log in.</p>
              <Button 
                variant="outline" 
                className="mt-4 w-full"
                onClick={() => navigate('/login')}
              >
                Log In
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.general && (
                <div className="p-3 rounded-md bg-red-100 text-red-700 text-sm">
                  {errors.general}
                </div>
              )}

              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-amber-500" />
                  <Input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Enter your full name"
                    className="pl-10"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>
              
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
                    placeholder="Create a password (min 6 characters)"
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
              
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-amber-500" />
                  <Input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    className="pl-10"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
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
                    Signing Up...
                  </>
                ) : (
                  'Sign Up'
                )}
              </Button>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-amber-800 text-sm">
              Already have an account? <Link to={'/login'} className="text-amber-600 hover:underline">Log In</Link>
            </p>
          </div>
        </motion.div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default SignUpPage;