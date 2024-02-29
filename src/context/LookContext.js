import { useContext, createContext, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export const LookContext = createContext();

export function useLooks() {
  return useContext(LookContext);
}

export function LooksProvider({ children }) {
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  
  const [looks, setLooks] = useState([]);
  const [imageDescription, setImageDescription] = useState("");
  const [newImage, setNewImage] = useState("");
  const [selectedLook, setSelectedLook] = useState(null);


  const handleLookClick = (look) => {
    setSelectedLook(look);
  };

  const handleCloseModal = () => {
    setSelectedLook(null);
  };

  const fetchLooks = async () => {
    try {
      const response = await axios.get(`${backendURL}/looks`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setLooks(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = (e) => {
    setImageDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    const myFile = e.target.files[0];
    const blob = myFile.slice(0, myFile.size);
    const fileExt = myFile.name.split(".").pop();
    const newFile = new File([blob], `${uuidv4()}.${fileExt}`, {
      type: `${myFile.type}`,
    });
    setNewImage(newFile);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const look = {
        url: newImage,
        description: imageDescription,
        categories: parseInt(1)
      };
      await axios.post(`${backendURL}/looks/`, look, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setNewImage("");
      setImageDescription("");
      fetchLooks();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteImg = async (imgId) => {
    try {
      await axios.delete(`${backendURL}/looks/${imgId}/`);
      fetchLooks();
    } catch (err) {
      console.error(err);
    }
  };
  

  return (
    <LookContext.Provider
      value={{
        looks,
        setLooks,
        fetchLooks,
        imageDescription,
        setImageDescription,
        handleChange,
        newImage,
        setNewImage,
        handleImageChange,
        selectedLook, 
        setSelectedLook,
        handleLookClick,
        handleCloseModal,
        handleSubmit,
        handleDeleteImg
      }}
    >
      {children}
    </LookContext.Provider>
  );
}
