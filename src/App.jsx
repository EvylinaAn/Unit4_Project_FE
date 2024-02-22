import { Routes, Route } from "react-router-dom";
import MainNavbar from "./components/navbar/Navbar"
import About from "./components/about/About"
import Category from "./components/blog/Category"
import BeautyIndex from "./components/blog/BeautyIndex"
import FashionIndex from "./components/blog/FashionIndex"
import TravelIndex from "./components/blog/TravelIndex"
import Looks from "./components/looks/Looks"

import "./App.css";
import DisplayPost from "./components/blog/DisplayPost";

export default function App() {
  return (
    <>
      <MainNavbar />
      <Routes>
        <Route path="/looks" element={<Looks />} />
      </Routes>
      <Routes>
        <Route path="/category" element={<Category />} />
      </Routes>
      <Routes>
        <Route path="/travel" element={<TravelIndex />} />
      </Routes>
      <Routes>
        <Route path="/fashion" element={<FashionIndex />} />
      </Routes>
      <Routes>
        <Route path="/beauty" element={<BeautyIndex />} />
      </Routes>
      <Routes>
        <Route path="/about" element={<About />} />
      </Routes>
      <Routes>
        <Route path="/single_post" element={<DisplayPost />} />
      </Routes>
    </>
  )
}


