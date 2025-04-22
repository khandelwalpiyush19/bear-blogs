import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'
import About from './pages/About';
import ContactUsPage from './pages/Contact';
import SignUpPage from './components/auth/SignUp';
import LoginPage from './components/auth/Login';
import AllBlogsPage from './pages/AllBlogs';
import Dashboard from './pages/Dashboard';
function App() {

  return (
    <>
       <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/all-blogs" element={<AllBlogsPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/signup" element={<SignUpPage/>} /> 
        <Route path="/login" element={<LoginPage/>} /> 
        <Route path="/dashboard" element={<Dashboard/>} /> 
        <Route path="*" element={<h1>404 Not Found</h1>} />
        
      </Routes>
    </Router>
    </>
  )
}

export default App
