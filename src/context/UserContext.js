import { useContext, createContext } from "react";

export const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UsersProvider({ children }) {
  const current_user = localStorage.getItem("current_user");
  const username = localStorage.getItem("current_username");

  const backendURL = process.env.REACT_APP_BACKEND_URL;

  // const [user, setUser] = useState(
  //     {
  //       email: '',
  //       username: ''
  //     }
  // )

  // const fetchUser = async () => {
  //   try {
  //     const url = `${backendURL}/users`;
  //     const  response  = await axios.get(url, {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  //           "Content-Type": "application/json" 
  //         },
  //     });
  //     console.log(response.data)
  //     setUser(response.data);
  //     window.location.href = "/";
  //     } catch (e) {
  //       console.error(e);
  //     }
  // }

  // const [currUser, setCurrUser] = useState({})
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  // const submit = async (e) => {
  //   e.preventDefault();
  //   const user = {
  //     username: username,
  //     password: password,
  //   };
  //   // Create the POST requuest
  //   const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/token/`, user,
  //   {
  //     headers: { "Content-Type": "application/json" },
  //   },
  //   {
  //       withCredentials: true
  //   },
  //   );
  //   localStorage.clear();
  //   localStorage.setItem("access_token", data.access);
  //   console.log(data)
  //   localStorage.setItem("refresh_token", data.refresh);
  //   axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("access_token")}`;
  //   console.log("User:", user);
  //   // fetchUser(data.access)
  //   window.location.href = "/";
  //   fetchUser()
  //   // console.log(user)
  // };

  return (
    <UserContext.Provider
      value={{
        // user,
        // fetchUser,
        // setUsername, 
        // password, 
        // setPassword, 
        // submit, 
        // fetchUserData,
        // currUser
        username,   
        current_user,
        backendURL

      }}
    >
      {children}
    </UserContext.Provider>
  );
}
