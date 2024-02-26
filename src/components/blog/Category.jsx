import { useEffect } from "react";
import { usePosts } from "../../context/PostContext";
import { Link } from "react-router-dom";

export default function Category() {
  const { posts, fetchPosts } = usePosts();

  useEffect(() => {
    fetchPosts();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const allPosts = posts.map(post => post.title)

  return (
    <>
      <h1>Category</h1>
      <ul>
        <li>
          <a href="/travel">Travel</a>
        </li>
        <li>
          <a href="/fashion">Fashion and Lifestyle</a>
        </li>
        <li>
          <a href="/beauty">Beauty</a>
        </li>
      </ul>
      <ul>
        {posts.map((post, index) => (
          // <li key={index}>{post}</li>
          <Link to={`/posts/${post.id}`} key={index}>
          <li>{post.title}</li>
        </Link>
        ))}
      </ul>
    </>
  );
}
