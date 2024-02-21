// Login.js
import React, { useState } from 'react';
import  {useNavigate}  from 'react-router-dom';
import '../styles/login.css'; // Import component-specific styles

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    
    if (username.trim() === 'polaris' && password.trim() === 'System@123') {
      navigate('/dashboard');
    } else {
      alert('Please enter valid username and password');
    }
  };

  return (
    <div className="login-container">
      <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </div>
        <button type="submit" className="login-btn">Login</button>
      </form>
      </div>
    </div>
  );
};

export default Login;
