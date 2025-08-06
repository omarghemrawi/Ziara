import React, { useState } from 'react';
import './Login.css';

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // TODO: call your login API here
    console.log('Logging in with:', credentials);
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
