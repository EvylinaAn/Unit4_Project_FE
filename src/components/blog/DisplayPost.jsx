import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { usePosts } from "../../context/PostContext";
import { useUser } from "../../context/UserContext";
import { CgProfile } from "react-icons/cg";
import Comments from "./Comments";
import "./Blog.css";

export default function DisplayPost() {
  const { postId } = useParams();
  const {
    singlePost,
    fetchSinglePost,
    featuredImg,
    allPostImgs,
    fetchFeaturedImage,
    allPostImages,
  } = usePosts();
  // const { current_user } = useUser();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchSinglePost(postId);
      setLoading(false);
    };
    fetchData();
    allPostImages();
    fetchFeaturedImage();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('access_token') !== null) 
      setIsAuth(true)
  }, [isAuth])

  return (
    <div>
      {loading ? (
        <div>Loading... </div>
      ) : (
        <>
          <h2 className="postTitle">{singlePost.title}</h2>
          <Carousel fade className="postCarousel">
            {featuredImg &&
              featuredImg.map(
                (img) =>
                  img.post === parseInt(postId) && (
                    <Carousel.Item key={img.id}>
                      <img
                        src={img.url}
                        alt="Featured"
                        className="d-block w-100"
                      />
                    </Carousel.Item>
                  )
              )}
            {allPostImgs.map(
              (img, index) =>
                img.post === parseInt(postId) && (
                  <Carousel.Item key={index}>
                    <img
                      src={img.url}
                      alt={`${index + 1}`}
                      className="d-block w-100"
                    />
                  </Carousel.Item>
                )
            )}
          </Carousel>
          <div
            dangerouslySetInnerHTML={{ __html: singlePost.content }}
            className="postContent"
          />
        </>
      )}
      <br />
      <hr />
      <div className="commentLogin">
        <h5>Comments</h5>
        <Link to="/logout" className="commentloginLink">
          <CgProfile className="commentLoginIcon" />
          <button className="btn btn-outline-secondary btn-sm commentLoginBtn ">
            {isAuth ? "Logout" : "Login"}
          </button>
        </Link>
      </div>
      <hr style={{ marginTop: "0" }} />
      <div>
        <Comments postId={postId} />
      </div>
    </div>
  );
}
