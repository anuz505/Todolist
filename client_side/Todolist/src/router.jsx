import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Login from "./Auth/login.jsx";
import Todolist from "./Todlist";
import Signup from "./Auth/signup.jsx";
import Hero from "./Hero";
import axios from "axios";
function ProtectedRoute({ element }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = document.cookie
      .split(";")
      .find((row) => row.startsWith("jwt"));
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  return element;
}
const handleLogout = async () => {
  try {
    await axios.post(
      "http://localhost:3000/logout",
      {},
      { withCredentials: true }
    );
    console.log("Logged out successfully");
    // Optionally, you can redirect the user to the login page or clear the tasks
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

export default function CustomRouter() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Hero</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
            <Link to="/tasks">Todolist</Link>
            <Link to="/#" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Hero />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route
          path="/tasks"
          element={<ProtectedRoute element={<Todolist />} />}
        ></Route>
        <Route path="/logout" element={<Hero />}></Route>
      </Routes>
    </Router>
  );
}
