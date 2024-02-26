import { useContext, createContext, useState } from "react";
import axios from "axios";

export const PostContext = createContext();

export function usePosts() {
  return useContext(PostContext);
}

export function PostsProvider({ children }) {
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  // const { postId } = useParams(); 

  const [posts, setPosts] = useState([
    {
      title: "",
      content: "",
    },
  ]);

  const [comments, setComments] = useState([]);


  const [singlePost, setSinglePost] = useState({
    title : '',
    content : ''
  });

  const [category, setCategory] = useState([
    {
        category: ""
    }
  ])

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${backendURL}/posts`, {
        headers: {
          // Authorization: `Basic ${btoa("tester:test")}`,
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
      });
      const result = response.data;
      setPosts(result);
    } catch (e) {
      console.error(e);
    }
  };


  const fetchSinglePost = async (postId) => {
    try {
      const response = await axios.get(`${backendURL}/posts/${postId}`, {
        headers: {
          // Authorization: `Basic ${btoa("tester:test")}`,
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
      });
      const result = response.data;
      setSinglePost(result);
    } catch (e) {
      console.error(e);
    }
  };
    

  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(`${backendURL}/comments`, {
        params: {
          post: postId,
        },
        headers: {
          // Authorization: `Basic ${btoa("tester:test")}`,
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
      });
      // console.log(response)
      setComments(response.data);
      // console.log(comments)
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };


  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${backendURL}/categories`, {
        headers: {
          // Authorization: `Basic ${btoa("tester:test")}`,
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
      });
      const result = response.data;
      setCategory(result);
    } catch (e) {
      console.error(e);
    }
  };
  

  return (
    <PostContext.Provider
      value={{
        backendURL,
        posts,
        setPosts,
        fetchPosts,
        category,
        singlePost,
        fetchCategories,
        fetchSinglePost,
        comments,
        setComments,
        fetchComments,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
