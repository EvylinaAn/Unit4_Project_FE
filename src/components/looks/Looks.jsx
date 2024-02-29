import { useEffect } from "react";
import { Card} from "react-bootstrap";
import { useUser } from "../../context/UserContext";
import { useLooks } from "../../context/LookContext";
import LookModal from "./LookModal";

export default function Looks() {
  const { current_user } = useUser();
  const {
    looks,
    fetchLooks,
    imageDescription,
    handleChange,
    handleImageChange,
    handleLookClick,
    handleSubmit,
  } = useLooks();

  useEffect(() => {
    fetchLooks();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1>Looks</h1>
      {parseInt(current_user) === 1 && (
        <form
          onSubmit={handleSubmit}
          className="lookForm"
          style={{ margin: "auto", border: "0.2px solid black" }}
        >
          <input
            type="file"
            id="image"
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
            required
            style={{
              borderBottom: "0.5px solid black",
            }}
          />
          <input
            type="text"
            placeholder="Description"
            id="title"
            value={imageDescription}
            onChange={handleChange}
            required
            style={{
              border: "none",
            }}
          />
          <input
            type="submit"
            style={{
              border: "none",
            }}
            value="Add"
          />
        </form>
      )}
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {looks.map((look, index) => (
          <Card
            key={index}
            style={{ width: "18rem", margin: "10px" }}
            onClick={() => handleLookClick(look)}
          >
            <Card.Img
              variant="top"
              src={look.url}
              style={{ minHeight: "30em", maxWidth: "20em" }}
            />
            <Card.Body>
              <Card.Title>{look.description}</Card.Title>
            </Card.Body>
          </Card>
        ))}
      </div>
      <LookModal />
    </>
  );
}
