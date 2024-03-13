// Import the react JS packages
import axios from "axios";
import { useState } from "react";
// import { useUser } from "./context/UserContext";
import { Link, useNavigate } from "react-router-dom";
// Define the Login function.
export const Login = () => {
  // const { username, setUsername, password, setPassword, submit } = useUser()
  const navigate = useNavigate()

  const backendURL = process.env.REACT_APP_BACKEND_URL;

  const [user, setUser] = useState({
    email: "",
    username: "",
    // url: "",
  });

  console.log(user)
  const fetchUser = async () => {
    try {
      const url = `${backendURL}/api/current_user/`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      setUser(response.data);
      localStorage.setItem("current_user", response.data.id);
      localStorage.setItem("current_username", response.data.username);
      // window.location.href = "/";
    } catch (e) {
      console.error(e);
    }
  };

  // const [currUser, setCurrUser] = useState({})
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const user = {
      username: username,
      password: password,
    };
    // Create the POST request
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/token/`,
      user,
      {
        headers: { "Content-Type": "application/json" },
      },
      {
        withCredentials: true,
      }
    );
    localStorage.clear();
    localStorage.setItem("access_token", data.access);
    console.log(data);
    localStorage.setItem("refresh_token", data.refresh);
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("access_token")}`;
    console.log("User:", user);
    fetchUser();
    navigate('/')
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={submit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              className="form-control mt-1"
              placeholder="Enter Username"
              name="username"
              type="text"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              name="password"
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <Link to="/signup">
              <button className="btn btn-outline-secondary btn-sm">Sign Up</button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
