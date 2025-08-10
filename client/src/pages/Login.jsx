import React, { useState } from 'react';
import axios from 'axios';
import {setUser} from "../redux/userActions"
import { useDispatch } from 'react-redux';
import './Login.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
   try {
      const response = await axios.post("http://localhost:5000/api/client/login", credentials);
      const user = response.data.user;

      // Dispatch user data to Redux store
      dispatch(setUser(user));

      console.log("Logged in user:", user);

      // Redirect or other logic here, e.g.,
       navigate("/profile")
    } catch (err) {
      console.error(err);
      alert("Login Faild")
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left: form */}
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit" className="btn login-submit">
            Log In
          </button>
        </form>

        {/* Right: illustration */}
        <div className="login-image">
          <img src="/image/intro.png" alt="Login illustration" />
        </div>
      </div>
    </div>
  );
}
