import { useEffect } from "react";
import { usePosts } from "../../context/PostContext";
import { Link } from "react-router-dom";

export default function Category() {
  const { posts, fetchPosts, featuredImg } = usePosts();

  useEffect(() => {
    fetchPosts();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const allPosts = posts.map(post => post.title)
  // console.log(posts)
  return (
    <div style={{ marginBottom: "10vmin" }}>
      {/* <h1>Category</h1> */}
      <ul className="catUL mx-5 py-3">
        <li>
          <img
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="random travel img"
          />
          <div className="ulText">
            <a href="/travel">Travel</a>
          </div>
        </li>
        <li>
          <img
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="random fashion img"
          />
          <div className="ulText">
            <a href="/fashion">Fashion and Lifestyle</a>
          </div>
        </li>
        <li>
          <img
            src="https://images.unsplash.com/photo-1526045478516-99145907023c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="random beauty img"
          />
          <div className="ulText">
            <a href="/beauty">Beauty</a>
          </div>
        </li>
      </ul>

      <div className="strike-through-line">
        <div className="strike-through-text">All Posts</div>
      </div>

      {posts.map((post, index) => (
        <div key={index} className="DisplayPostZigZag py-3 mx-5">
          <>
            {featuredImg && featuredImg.length > 0 && (
              <>
                {featuredImg.map(
                  (img) =>
                    img.post === post.id && (
                      <img
                      style={{height: "50em"}}
                        key={img.id}
                        src={img.url}
                        alt="Featured"
                        className=""
                      />
                    )
                )}
                <h2 style={{ margin: "auto" }}>
                  <Link to={`/posts/${post.id}`}>
                    <h2>{post.title}</h2>
                  </Link>
                </h2>
              </>
            )}
          </>
        </div>
      ))}
    </div>
  );
}
