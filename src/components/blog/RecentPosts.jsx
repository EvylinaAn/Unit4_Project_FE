import { usePosts } from "../../context/PostContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function RecentIndex() {
  const { fetchPosts, fetchCategories, posts, featuredImg } = usePosts();

  useEffect(() => {
    fetchPosts();
    fetchCategories();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 3);

  return (
    <div style={{ maxWidth: "90%", margin: "auto", marginBottom: "5vmin"}}>
      {recentPosts.map((post, index) => (
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
                        style={{height: "40em"}}
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
                        style={{height: "40em" }}
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
