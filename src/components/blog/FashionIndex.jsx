import { usePosts } from "../../context/PostContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function FashionIndex() {
  const { posts, fetchPosts, fetchCategories, featuredImg } = usePosts();

  useEffect(() => {
    fetchPosts();
    fetchCategories()
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fashionPosts = posts
  .filter(post => post.categories && post.categories.includes('Fashion and Lifestyle'))
  .map(post => post);

  return (
    <div style={{margin:"auto", maxWidth:"90%", marginBottom:"10vmin"}}>
      <h1>Fashion</h1>
      {fashionPosts.map((post, index) => (
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
                      style={{height: "30em"}}
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
                      style={{height: "30em"}}
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