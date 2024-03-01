import { usePosts } from "../../context/PostContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function BeautyIndex() {
  const { posts, fetchPosts, featuredImg} = usePosts();

  useEffect(() => {
    fetchPosts();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const beautyPosts = posts
  .filter(post => post.categories && post.categories.includes('Beauty'))
  .map(post => post);

  return (
    <div style={{margin:"auto", maxWidth:"90%"}}>
      <h1>Beauty</h1>
      {beautyPosts.map((post, index) => (
      <div key={index} className="DisplayPostZigZag py-3">
          {(index % 2 === 1) ? (
            <>
              <h2 style={{ margin: "auto" }}>
                <Link to={`/posts/${post.id}`}>
                  <h2>{post.title}</h2>
                </Link>
              </h2>
              {featuredImg && featuredImg.length > 0 && (
                <>
                  {featuredImg.map(
                    (img) =>
                      img.post === post.id && (
                        <img
                          key={img.id}
                          src={img.url}
                          alt="Featured"
                          className=""
                        />
                      )
                  )}
                </>
              )}
            </>
          ) : (
            <>
              {featuredImg && featuredImg.length > 0 && (
                <>
                  {featuredImg.map(
                    (img) =>
                      img.post === post.id && (
                        <img
                          key={img.id}
                          src={img.url}
                          alt="Featured"
                          className=""
                        />
                      )
                  )}
                </>
              )}
              <h2 style={{ margin: "auto" }}>
                <Link to={`/posts/${post.id}`}>
                  <h2>{post.title}</h2>
                </Link>
              </h2>
            </>
          )}
        </div>
    ))}
    </div>
  );
}