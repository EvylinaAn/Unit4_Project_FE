// export default function EditCommentModal() {
//   return (
//     <div class="modal" tabindex="-1" role="dialog">
//       <div class="modal-dialog" role="document">
//         <div class="modal-content">
//           <div class="modal-header">
//             <h5 class="modal-title">Modal title</h5>
//             <button
//               type="button"
//               class="close"
//               data-dismiss="modal"
//               aria-label="Close"
//             >
//               <span aria-hidden="true">&times;</span>
//             </button>
//           </div>
//           <div class="modal-body">
//             <p>Modal body text goes here.</p>
//           </div>
//           <div class="modal-footer">
//             <button type="button" class="btn btn-primary">
//               Save changes
//             </button>
//             <button
//               type="button"
//               class="btn btn-secondary"
//               data-dismiss="modal"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import axios from "axios";

export default function EditCommentModal({ commentId, onClose }) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchComment() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/comments/${commentId}/`);
        setComment(response.data.comment);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching comment:", error);
        setLoading(false);
      }
    }

    fetchComment();
  }, [commentId]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/comments/${commentId}/`,
        { comment: comment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      onClose();
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="modal" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Comment</h5>
            <button type="button" className="close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <textarea
              className="form-control"
              rows="3"
              value={comment}
              onChange={handleCommentChange}
            ></textarea>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>
              Save changes
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
