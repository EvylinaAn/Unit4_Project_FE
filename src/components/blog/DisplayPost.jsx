import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePosts } from "../../context/PostContext";
import Comments from "./Comments";
import { Link } from "react-router-dom";

export default function DisplayPost() {
  const { postId } = useParams();
  const { singlePost, fetchSinglePost, fetchComments, comments } = usePosts();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchSinglePost(postId);
      await fetchComments(postId);
      setLoading(false);
    };
    fetchData();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {loading ? (
        <div>Loading... </div>
      ) : (
        <div>
          <h2>{singlePost.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: singlePost.content }} />
          {singlePost.photos.map((photo, index) => (
            <img key={index} src={photo.url} alt={`${index + 1}`} />
          ))}
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
        <Comments />
      </div>
    </div>
  );
}
