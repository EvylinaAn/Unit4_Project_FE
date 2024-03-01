import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useUser } from "./context/UserContext";
import { usePosts } from "./context/PostContext";
import Home from "./Home";
import MainNavbar from "./components/navbar/Navbar";
import Footer from "./components/navbar/Footer";
import About from "./components/about/About";
import Category from "./components/blog/Category";
import BeautyIndex from "./components/blog/BeautyIndex";
import FashionIndex from "./components/blog/FashionIndex";
import TravelIndex from "./components/blog/TravelIndex";
import Looks from "./components/looks/Looks";
import DisplayPost from "./components/blog/DisplayPost";

import { Login } from "./Login"
import { Logout } from "./Logout"
import SignUpForm from "./SignUpForm";

import "./App.css";

export default function App() {
  const { user } = useUser() 
  const { fetchPosts, setPostComment, fetchFeaturedImage } = usePosts()

  useEffect(() => {
    fetchPosts()
    setPostComment(false)
    fetchFeaturedImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  
  
  return (
    <>
      <MainNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/looks" element={<Looks />} />
        <Route path="/category" element={<Category />} />
        <Route path="/travel" element={<TravelIndex />} />
        <Route path="/fashion" element={<FashionIndex />} />
        <Route path="/beauty" element={<BeautyIndex />} />
        <Route path="/about" element={<About />} />
        <Route path="/posts/:postId" element={<DisplayPost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
      <Footer />
    </>
  );
}


