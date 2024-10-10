import React, { useEffect, useState } from "react";
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

const handleLogout = async (setIsAuthenticated) => {
  try {
    await axios.post(
      "https://taskmeifyoucan25.vercel.app/?vercelToolbarCode=_a5myzXVK9C-reK/logout",
      {},
      { withCredentials: true }
    );
    console.log("Logged out successfully");
    setIsAuthenticated(false); // Set authentication status to false
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

export default function CustomRouter() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = document.cookie
      .split(";")
      .find((row) => row.trim().startsWith("jwt="));
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
            {!isAuthenticated && (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
                <Link to="/tasks">Todolist</Link>
              </>
            )}
            {isAuthenticated && (
              <>
                <Link to="/tasks">Todolist</Link>
                <Link
                  to="/logout"
                  onClick={() => handleLogout(setIsAuthenticated)}
                >
                  Logout
                </Link>
              </>
            )}
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
