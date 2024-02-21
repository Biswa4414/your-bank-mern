import React, { useState } from "react";
import axios from "axios";
import "../Login/login.css"; // Import CSS file
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Check if username or password is empty
    if (!username || !password) {
      setError("Please fill in both username and password.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/login", {
        username,
        password,
      });
      alert("Login successful:", response.data);
      navigate("/dashboard")
    } catch (error) {
      alert("Error logging in:", error.response.data);
      setError(
        error.response.data.message || "An error occurred during login."
      );
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="input-group">
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="login-btn" onClick={handleLogin}>
        Login
      </button>
      <div className="btn">
        <button className="login-btn" onClick={() => navigate("/")}>Register</button>
        <button className="dash-btn"onClick={() => navigate("/dashboard")}>Dashboard</button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default LoginPage;
