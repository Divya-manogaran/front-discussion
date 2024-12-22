import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Auth.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending:', { username, email, password });
      const response = await axios.post('https://backend-discussion-4.onrender.com/api/auth/register', { username, email, password });
      console.log('Response:', response.data);
      if (response.data.success) {
        alert('Registration Successful!');
        navigate('/');
      } else {
        alert(response.data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Error during registration');
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}  // Corrected the function to set username
          required
        />
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
        <button type="submit">Register</button>
      </form>
      <br />
      <button onClick={() => navigate('/')}>Back to Login</button>
    </div>
  );
};

export default Register;
