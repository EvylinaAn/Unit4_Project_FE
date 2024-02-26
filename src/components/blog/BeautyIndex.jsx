import { usePosts } from "../../context/PostContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function BeautyIndex() {
  const { posts, fetchPosts} = usePosts();

  useEffect(() => {
    fetchPosts();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const beautyPosts = posts
  .filter(post => post.categories && post.categories.includes('Beauty'))
  .map(post => post);

  return (
    <>
      <h1>Beauty</h1>
      {beautyPosts.map((post, index) => (
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