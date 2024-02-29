import { useState, useEffect, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

export default function EditCommentModal({
  showModal,
  handleClose,
  username,
  allComments,
  selectedCommentId,
  setAllComments,
  fetchComments,
  postId,
  current_user
}) {
  // const [comment, setComment] = useState("");
  // const [loading, setLoading] = useState(true);
  const [editedComment, setEditedComment] = useState("");

  const commentRef = useRef();

  async function populateFormFields() {
    try {
      const commentToEdit = allComments.find(
        (comment) => comment.id === selectedCommentId
      );
      console.log(commentToEdit);
      if (commentToEdit) {
        commentRef.current.value = commentToEdit.comment;
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleChangeCreate(value) {
    setEditedComment(value);
  }

  // console.log(selectedCommentId)

  async function editComment(selectedCommentId, updatedComment) {
    try {
      const commentData = {
        comment: editedComment,
        post: postId,
        owner: current_user,
      };
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/comments/${selectedCommentId}/`, commentData
      );
      fetchComments();
    } catch (e) {
      console.log("Error editing schedule", e);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await editComment(selectedCommentId, editedComment);
      handleClose();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (showModal) {
      populateFormFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal]);

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Form>
        <Modal.Header closeButton>
          <Modal.Title>{username}</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ padding: "0" }}>
          <Form.Group className="mb-3" controlId="description">
            <Form.Control
              type="text"
              required
              ref={commentRef}
              value={editedComment}
              onChange={(e) => handleChangeCreate(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="success" onClick={handleSubmit}>
            Save Edit
          </Button>
          <Button
            variant="success"
            onClick={() => {
              handleClose();
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
