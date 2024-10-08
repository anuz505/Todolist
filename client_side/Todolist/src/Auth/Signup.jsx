import axios from "axios";
import React, { useState } from "react";
export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("http://localhost:3000/signup", {
        email,
        password,
      });
      console.log(response.data);

      if (response.data.user) {
        location.assign("/");
      }
    } catch (error) {
      setError(
        error.response.data.Errors.email || error.response.data.Errors.password
      );
    }
  };
  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Signup</button>
      </form>
      <h1>{error}</h1>
    </div>
  );
}
