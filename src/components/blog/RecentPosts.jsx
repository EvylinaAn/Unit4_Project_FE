import { usePosts } from "../../context/PostContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function RecentIndex() {
  const { posts, fetchPosts, fetchCategories, } = usePosts();

  useEffect(() => {
    fetchPosts();
    fetchCategories()
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const recentPosts = [...posts].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 3);


  return (
    <>
      <h1>Recent Posts</h1>
      {recentPosts.map((post, index) => (
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
