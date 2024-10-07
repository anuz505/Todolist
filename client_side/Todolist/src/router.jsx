import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Auth/login.jsx";
import Todolist from "./Todlist";
import Signup from "./Auth/signup.jsx";

export default function CustomRouter() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Todolist</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Todolist />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </Router>
  );
}
