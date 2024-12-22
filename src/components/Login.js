import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://backend-discussion-4.onrender.com/api/auth/login', { email, password });
      if (response.data.token) {
        alert('Login Successful!');
        // Redirect to the Weather Search Page
        navigate('/Home');
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error(error);
      alert('Error during login');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form><br></br>
      <button onClick={() => navigate('/register')}>Go to Register</button>
    </div>
  );
};

export default Login;