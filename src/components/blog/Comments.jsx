import React, { useState, useEffect } from "react";
import { usePosts } from "../../context/PostContext";
import { Link } from "react-router-dom";
import axios from "axios";
import EditCommentModal from "./EditCommentModal";

export default function Comments({ postId }) {
  const { backendURL } = usePosts();

  const current_user = localStorage.getItem("current_user");
  const username = localStorage.getItem("current_username");

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);

  const [editComment, setEditComment] = useState(false);

  function handleShowModal(commentId) {
    setEditComment(true);
  }

  function handleCloseModal() {
    setEditComment(false);
  }

  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) setIsAuth(true);
    // (async () => fetchAllComments())();
    (async () => fetchComments())();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(`${backendURL}/comments`, {
        params: {
          post: postId,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      setComments(response.data);
      // return response.data;
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleChange = async (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const commentData = {
        comment: newComment,
        post: postId,
        owner: current_user,
      };
      console.log(commentData);
      await axios.post(
        `${backendURL}/comments/`,
        commentData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      fetchComments();
      setNewComment("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`${backendURL}/comments/${commentId}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      fetchComments(postId);
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <>
      <ul>
        {comments &&
          comments.map((comment, index) => (
            <React.Fragment key={comment.id}>
              {comment.post === parseInt(postId) && (
                <li>
                  {comment.comment}
                  {comment.owner === parseInt(current_user) && (
                    <>
                      <button
                        onClick={() => {
                          handleShowModal(comment.id);
                          setSelectedComment(comment.id);
                        }}
                      >
                        Edit
                      </button>
                      <button onClick={() => handleDeleteComment(comment.id)}>
                        Delete
                      </button>
                    </>
                  )}
                </li>
              )}
            </React.Fragment>
          ))}
      </ul>
      {isAuth ? (
        <form onSubmit={handleAddComment}>
          <input
            type="text"
            name="comment"
            value={newComment}
            onChange={handleChange}
            placeholder="Type you comment"
            required
            pattern=".{3,}"
          />
          <button type="submit">ADD</button>
        </form>
      ) : (
        <p>
          <span>
            <Link to="/login">Login</Link>
          </span>
          <span> to add a comment</span>
        </p>
      )}

      {/* {comments.map(comment => ( */}

      <EditCommentModal
        postId={postId}
        selectedCommentId={selectedComment}
        allComments={comments}
        setAllComments={setComments}
        fetchComments={fetchComments}
        username={username}
        current_user={current_user}
        showModal={editComment}
        handleClose={handleCloseModal}
      />
      {/* ))} */}
    </>
  );
}
