import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Auth/login.jsx";
import Todolist from "./Todlist";
import Signup from "./Auth/signup.jsx";
import Hero from "./Hero";

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
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Hero />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/tasks" element={<Todolist />}></Route>
      </Routes>
    </Router>
  );
}
