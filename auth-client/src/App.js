import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import './App.css';

function App() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const url = mode === 'login' ? '/api/login' : '/api/register';
    try {
      const res = await axios.post('http://localhost:5000' + url, form);
      setMessage(res.data.message || 'Success!');
      if (res.data.token) localStorage.setItem('token', res.data.token);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error!');
    }
  };

  return (
    <div className="container">
      <motion.div
        className="form-container"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>{mode === 'login' ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
            autoComplete="username"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            autoComplete={mode === 'login' ? "current-password" : "new-password"}
          />
          <button type="submit">{mode === 'login' ? 'Login' : 'Sign Up'}</button>
        </form>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: message ? 1 : 0 }}
        >{message}</motion.p>
        <div>
          {mode === 'login' ? (
            <span>Don't have an account? <button onClick={() => setMode('signup')}>Sign Up</button></span>
          ) : (
            <span>Already a user? <button onClick={() => setMode('login')}>Login</button></span>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default App;