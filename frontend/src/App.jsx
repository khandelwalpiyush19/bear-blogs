import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'
import About from './pages/About';
import ContactUsPage from './pages/Contact';
import SignUpPage from './components/auth/SignUp';
import LoginPage from './components/auth/Login';
import AllBlogsPage from './pages/AllBlogs';
import DashboardLayout from './pages/Dashboard';
import DashboardContent from './components/dashboard/DashboardContent';
import CreateBlog from './components/dashboard/CreateBlog';
import UpdateBlogs from './components/dashboard/UpdateBlogs';
import Profile from './components/dashboard/Profile';
import MyBlogs from './components/dashboard/MyBlogs';
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
        <Route path="/dashboard" element={<DashboardLayout/>}>
          <Route index element={<DashboardContent />} />
          <Route path="create" element={<CreateBlog />} />
          <Route path="myblogs" element={<MyBlogs />} />
          <Route path="update" element={<UpdateBlogs />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<h1>404 Not Found</h1>} />
        
      </Routes>
    </Router>
    </>
  )
}

export default App
