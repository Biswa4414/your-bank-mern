import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Register/register.css";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    // Check if any of the fields are empty
    if (!name || !email || !username || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/register", {
        name: name,
        email: email,
        username: username,
        password: password,
      });
      console.log("Registration successful:", response.data);
      navigate("/login");
    } catch (error) {
      alert("Error registering:", error.response?.data || error.message);
      setError(
        error.response?.data?.message ||
          "An error occurred during registration."
      );
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <div className="input-group">
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
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
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="register-btn" onClick={handleRegister}>
        Register
      </button>
      <div className="btn">
        <button className="login-btn" onClick={() => navigate("/login")}>
          Login
        </button>
        <button className="dash-btn" onClick={() => navigate("/dashboard")}>
          Dashboard
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default RegisterPage;
