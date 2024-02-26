import { useEffect, useState } from "react";
import FeaturedPosts from "./components/blog/FeaturedPosts"
import RecentPosts from "./components/blog/RecentPosts"
import { usePosts } from "./context/PostContext";

import { Link } from "react-router-dom"

export default function Home() {
  const { fetchPosts, fetchCategories } = usePosts()

  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('access_token') !== null) {
       setIsAuth(true); 
     }
   }, [isAuth]);



  useEffect(() => {
    fetchPosts()  
    fetchCategories()
    //eslint-disable-next-line react-hooks/exhaustive-deps     
  },[])
  
  return (
    <>
        <h1>Home</h1>
        <FeaturedPosts />
        <RecentPosts />
        <button>
        {isAuth ? <Link to="/logout">Logout</Link> :  
                    <Link to="/login">Login</Link>}
        </button>
    </>
  )
}














// Import the react JS packages
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { usePosts } from "./context/PostContext";
// // Define the Login function.
// const Home = () => {
//   // const { fetchPosts } = usePosts()
//   const [message, setMessage] = useState("");
//   useEffect(() => {
//     if (localStorage.getItem("access_token") === null) {
//       window.location.href = "/login";
//     } else {
//       (async () => {
//         try {
//           const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/home/`, {
//             headers: {
//               "Content-Type": "application/json",
//               "Authorization": `Bearer ${localStorage.getItem("access_token")}`
//             },
//           });
//           setMessage(data.message);
//         } catch (e) {
//           console.log("not auth");
//         }
//       })();
//     }
//     // fetchPosts()
//   }, []);
//   return (
//     <div className="form-signin mt-5 text-center">
//       <h3>Hi {message}</h3>
//       <FeaturedPosts />
//       <RecentPosts />
//     </div>
//   );
// };

// export default Home;
