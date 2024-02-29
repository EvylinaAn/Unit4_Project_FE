import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePosts } from "../../context/PostContext";
import Comments from "./Comments";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Blog.css"

export default function DisplayPost() {
  const { postId } = useParams();
  const { singlePost, fetchSinglePost, backendURL } = usePosts();

  const [loading, setLoading] = useState(true);

  const [featuredImg, setFeaturedImg] = useState([])
  const [allPostImgs, setAllPostImgs] = useState([])


  const fetchFeaturedImage = async () => {
    try {
      const response = await axios.get(`${backendURL}/featuredPhoto`, {
        headers: {
          "Content-Type": "application/json",
        }
      })
      const result = response.data
      // console.log(result)
      setFeaturedImg(result)
    } catch (e) {
      console.error(e);
    }
  }

  const allPostImages = async () => {
    try {
      const response = await axios.get(`${backendURL}/photos`, {
        headers: {
          "Content-Type": "application/json",
        }
      })
      const result = response.data
      // console.log(result)
      setAllPostImgs(result)
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchSinglePost(postId);
      setLoading(false);
    };
    fetchData();
    allPostImages()
    fetchFeaturedImage()
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {loading ? (
        <div>Loading... </div>
      ) : (
        <div>
          <h2>{singlePost.title}</h2>
          {featuredImg && featuredImg.map((img) => (
            <div key={img.id}>
              {img.post === parseInt(postId) && (
                <img src={img.url} alt="Featured" className="blogImg" />
              )}
            </div>
          ))}
          {allPostImgs.map((img, index) => (
            <div key={img.id}>
              {img.post === parseInt(postId) && (
              <img key={index} src={img.url} alt={`${index + 1}`} className="blogImg"/>
              )}
            </div>
            ))}
            <div dangerouslySetInnerHTML={{ __html: singlePost.content }} />
        </div>
      )}
      <Link to="/login">
        <button className="btn btn-outline-secondary btn-sm">Login</button>
      </Link>
      <Link to="/logout">
        <button className="btn btn-outline-secondary btn-sm">Logout</button>
      </Link>
      <hr />
      <div>
        <Comments postId={postId} />
      </div>
    </div>
  );
}
