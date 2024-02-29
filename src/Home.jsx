import { useEffect, useState } from "react";
import { usePosts } from "./context/PostContext";
import { useLooks } from "./context/LookContext";
import FeaturedPosts from "./components/blog/FeaturedPosts";
import RecentPosts from "./components/blog/RecentPosts";
import LookModal from "./components/looks/LookModal";

import { Link } from "react-router-dom";

export default function Home() {
  const { fetchPosts, fetchCategories } = usePosts();
  const { looks, fetchLooks, handleLookClick } = useLooks();

  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      setIsAuth(true);
    }
  }, [isAuth]);


  const filteredLooks = looks.filter((look) => look.categories.includes(2));
  console.log(filteredLooks);

  useEffect(() => {
    fetchPosts();
    fetchCategories();
    fetchLooks();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1>Home</h1>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {filteredLooks.slice(0, 3).map((look, index) => (
          <img
            key={index}
            src={look.url}
            alt={`Look ${index + 1}`}
            style={{ width: "30vmin", height: "50vmin", borderRadius:'10px' }}
            onClick={() => handleLookClick(look)}
          />
        ))}
      </div>
      <FeaturedPosts />
      <RecentPosts />
      <button>
        {isAuth ? (
          <Link to="/logout">Logout</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </button>
      <LookModal />
    </>
  );
}

