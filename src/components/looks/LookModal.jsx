import { useLooks } from "../../context/LookContext";
import { useUser } from "../../context/UserContext";
import { Modal, Button } from "react-bootstrap";

export default function LookModal() {
    const { current_user } = useUser()
    const { selectedLook, handleCloseModal, handleDeleteImg} = useLooks()

  return (
    <>
      <Modal show={selectedLook !== null} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <p style={{ marginBottom: "0" }}>That Fashion Tale</p>
        </Modal.Header>
        <Modal.Body>
          {selectedLook && (
            <>
              <img
                src={selectedLook.url}
                alt={selectedLook.description}
                style={{ maxWidth: "100%" }}
              />
              <p style={{ paddingTop: "2vmin" }}>{selectedLook.description}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          {parseInt(current_user) === 1 && (
            <Button
              variant="secondary"
              onClick={() => {
                handleDeleteImg(selectedLook.id);
                handleCloseModal();
              }}
            >
              Delete
            </Button>
          )}
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
