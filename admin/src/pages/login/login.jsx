import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    // Check for admin credentials
    if (email === "omar@admin.com" && password === "omaradmin") {
      setError("");
      alert("Login successful! Welcome Admin Omar.");
      navigate("/dashboard", { replace: true });
    } else {
      setError("Invalid credentials. Please use: omar@admin.com / omaradmin");
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Panel Login</h2>
      <p
        style={{
          color: "#6366f1",
          marginBottom: "24px",
          fontWeight: 500,
          fontSize: "1.1rem",
        }}
      >
        Please sign in with your admin credentials
      </p>

      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="error">{error}</div>}
        <button type="submit">Login</button>
      </form>

      {/* Credentials info */}
      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          background: "#f8f9fa",
          borderRadius: "6px",
          fontSize: "12px",
          color: "#666",
          textAlign: "center",
        }}
      >
        <strong>Admin:</strong> omar@admin.com / omaradmin
      </div>
    </div>
  );
};

export default Login;
