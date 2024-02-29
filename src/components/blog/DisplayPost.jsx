import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { usePosts } from "../../context/PostContext";
import { useUser } from "../../context/UserContext";
import Comments from "./Comments";
import axios from "axios";
import "./Blog.css";

export default function DisplayPost() {
  const { postId } = useParams();
  const { singlePost, fetchSinglePost, backendURL } = usePosts();
  const { current_user } = useUser()

  const [loading, setLoading] = useState(true);

  const [featuredImg, setFeaturedImg] = useState([]);
  const [allPostImgs, setAllPostImgs] = useState([]);

  const fetchFeaturedImage = async () => {
    try {
      const response = await axios.get(`${backendURL}/featuredPhoto`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = response.data;
      // console.log(result)
      setFeaturedImg(result);
    } catch (e) {
      console.error(e);
    }
  };

  const allPostImages = async () => {
    try {
      const response = await axios.get(`${backendURL}/photos`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = response.data;
      // console.log(result)
      setAllPostImgs(result);
    } catch (e) {
      console.error(e);
    }
  };

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
          <div dangerouslySetInnerHTML={{ __html: singlePost.content }} className="postContent"/>
        </>
      )}
      {/* <Link to="/login">
        <button className="btn btn-outline-secondary btn-sm">Login</button>
      </Link>
      <Link to="/logout">
        <button className="btn btn-outline-secondary btn-sm">Logout</button>
      </Link> */}
      <Link to="/login">
  <button className="btn btn-outline-secondary btn-sm">
    {current_user ? "Logout" : "Login"}
  </button>
</Link>
      <hr />
      <div>
        <Comments postId={postId} />
      </div>
    </div>
  );
}
