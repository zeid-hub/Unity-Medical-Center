import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const { token } = await response.json();
        // Store token in local storage
        localStorage.setItem("token", token);
        // Redirect to home page
        navigate("/home");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <label htmlFor="username" className="login-label">Username:</label><br />
        <input type="text" id="username" className="login-input" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
        <label htmlFor="password" className="login-label">Password:</label><br />
        <input type="password" id="password" className="login-input" value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}

export default Login;
