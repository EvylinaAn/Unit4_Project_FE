

import React, { useState, useEffect } from "react";
import { usePosts } from "../../context/PostContext";
import { Link } from "react-router-dom";
import axios from "axios";
import EditCommentModal from "./EditCommentModal";
import { CgProfile } from "react-icons/cg";
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";

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
        username: username
      };
      console.log(commentData);
      const result = await axios.post(`${backendURL}/comments/`, commentData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
      });
      console.log(result)
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

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "2-digit",
      month: "long",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  // Iterate over each comment and format the created_at timestamp
  const formattedComments = comments.map((comment) => {
    const formattedTime = formatTimestamp(comment.created_at);
    return { ...comment, created_at: formattedTime };
  });

  return (
    <div style={{marginBottom:"10vmin"}}>
      {isAuth ? (
        <form onSubmit={handleAddComment} className="commentForm">
          <CgProfile className="commentIcon" />
          <input
            type="text"
            name="comment"
            value={newComment}
            onChange={handleChange}
            placeholder="Type you comment"
            required
            pattern=".{3,}"
            className="commentInput"
          />
          <button type="submit" className="btn">
            comment
          </button>
        </form>
      ) : (
        <p>
          <span>
            <Link to="/login">Login</Link>
          </span>
          <span> to add a comment</span>
        </p>
      )}

      <ul>
        {formattedComments &&
          formattedComments.map((comment, index) => (
            <React.Fragment key={comment.id}>
              {comment.post === parseInt(postId) && (
                <li className="commentDisplay">
                  <h5 style={{color:'plum'}}>
                    <CgProfile /> {comment.username}
                  </h5>
                  <p className="px-3 m-auto mb-0 border " style={{width: "100%", textAlign: "left", lineHeight: "4"}}>
                  {comment.comment}
                  </p>
                  <div className="commentFooter">
                    {comment.created_at}
                    {comment.owner === parseInt(current_user) && (
                      <div>
                        <button
                          className="btn btn-sm"
                          onClick={() => {
                            handleShowModal(comment.id);
                            setSelectedComment(comment.id);
                          }}
                        >
                          <MdOutlineEdit />
                        </button>
                        <button
                          className="btn btn-sm"
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          <MdOutlineDeleteOutline />
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              )}
            </React.Fragment>
          ))}
      </ul>

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
    </div>
  );
}
