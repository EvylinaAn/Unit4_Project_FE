import { usePosts } from "../../context/PostContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function TravelIndex() {
  const { posts, fetchPosts, fetchCategories, } = usePosts();

  useEffect(() => {
    fetchPosts();
    fetchCategories()
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const travelPosts = posts
  .filter(post => post.categories && post.categories.includes('Travel'))
  .map(post => post);

  return (
    <>
      <h1>Travel</h1>
      {travelPosts.map((post, index) => (
        <div key={index}>
        <h2>
          <Link to={`/posts/${post.id}`}>
            <h2>{post.title}</h2>
          </Link>
        </h2>
        </div>     
    ))}
    </>
  );
}
