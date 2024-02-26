import { useState } from "react";
import { usePosts } from "../../context/PostContext";
import axios from "axios";
import EditCommentModal from "./EditCommentModal";

export default function Comments() {
  const { singlePost, comments, setComments, backendURL, fetchComments } = usePosts();

  const [ newComment, setNewComment ] = useState('');
  const [commentModal, setCommentModal] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);

  function handleShowModal(commentId) {
    setCommentModal(true);
    setSelectedCommentId(commentId);
  }

  function handleCloseModal() {
    setCommentModal(false)
    setSelectedCommentId(null);
  }

  const handleChange = async (e) => {
    setNewComment (e.target.value)
}


const handleAddComment = async (e) => {
    e.preventDefault()
    try {
        const commentData = {
            comment: newComment,
            post: singlePost.url 
        };
      
        await axios.post(
            `${backendURL}/comments/`,
            commentData,
                {
                    headers: {
                        // Authorization: `Basic ${btoa("tester:test")}`,
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                        "Content-Type": "application/json",
                    }
                }
            )
            console.log(newComment.id)
            setNewComment([])
            fetchComments()
            console.log(comments)
    } catch(err) {
        console.error(err)
    }
  }

const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(
        `${backendURL}/comments/${commentId}/`,
        {
          headers: {
            // Authorization: `Basic ${btoa("tester:test")}`,
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          }
        }
      );
    fetchComments()
    } catch(err) {
      console.error(err);
    }
  }

  

  return (
    <>
        <ul>
            {comments && comments.map((comment, index) =>
                comment.post === singlePost.url && (
                <>
                    <li key={index} id={index}>{comment.comment}</li>
                    <button onClick={() => handleShowModal(comment.id)}>Edit</button>
                    &nbsp; &nbsp;
                    <button onClick={() => handleDeleteComment(comment.id)}>x</button>
                </>
                )
            )}
        </ul>
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
        <button
          type="submit"
        >
          ADD
        </button>
      </form>
      {commentModal && <EditCommentModal commentId={selectedCommentId} onClose={handleCloseModal} />}
    </>
  );
}
