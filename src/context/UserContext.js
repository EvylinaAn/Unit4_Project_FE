import { useContext, createContext, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UsersProvider({ children }) {
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  // const [user, setUser] = useState(
  //     {
  //       email: '',
  //       username: ','
  //     }
  // )

  // const fetchUser = async () => {
  //   try {
  //     const url = `${backendURL}/users`;
  //     const  response  = await axios.get(url, { auth: {username: 'tester', password: 'test'} });
  //     setUser(response.data);
  //     } catch (e) {
  //       console.error(e);
  //     }
  // }

  return (
    <UserContext.Provider
      value={{
        // user,
        // fetchUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
