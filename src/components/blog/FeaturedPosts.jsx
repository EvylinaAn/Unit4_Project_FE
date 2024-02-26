import { usePosts } from "../../context/PostContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function FeaturedIndex() {
  const { posts, fetchPosts, fetchCategories, } = usePosts();

  useEffect(() => {
    fetchPosts();
    fetchCategories()
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const featuredPosts = posts
  .filter(post => post.categories && post.categories.includes('Featured')).slice(-3);

  return (
    <>
      <h1>Featured Posts</h1>
      {featuredPosts.map((post, index) => (
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
