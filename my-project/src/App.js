import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import BrowserRouter as Router
import Blogs from './Component/BlogForm';
// import Blog from './Component/Blog';
import Footer from './Component/Footer';
import Headar from './Component/Headar';
import Home from './Pages/Home';
import AuthForm from './Pages/SignUp';
import LoginForm from './Pages/SignIn';
import BlogDetails from './Pages/BlogDetails';

function App() {
  return (
    <div className="App">
      <Router> {/* Wrap your entire application with the Router */}
       <Headar /> 
       
       <Routes>
        
          <Route path="/" element={<Home />} />
          <Route path="/SignIn" element={<LoginForm />} />
          <Route path="/SignUp" element={<AuthForm />} />
          <Route path="/blogs" element={<Blogs />} /> 
          <Route path="/blog/:id" element={<BlogDetails/>} /> 

          {/* <Route path="/Blog" element={<Blog />} />  */}
        </Routes>
        {/* <Blog/> */}
        <Footer />
      </Router>
    </div>
  );
}

export default App;
