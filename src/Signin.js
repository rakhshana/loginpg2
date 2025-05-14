import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

function Signin({ onLoginSuccess, onSwitchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const signinurl = process.env.REACT_APP_API_SIGNIN;

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch(signinurl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'reqres-free-v1'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Login successful! Token: ${data.token}`);
        onLoginSuccess();
      } else {
        setMessage(`Login failed: ${data.error}`);
      }
    } catch (error) {
      setMessage(`Network error: ${error.message}`);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
      <form
        onSubmit={handleLogin}
        style={{
          border: '1px solid #ccc',
          padding: '40px',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9',
          width: '300px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h2 style={{ textAlign: 'center' }}>Login</h2>

        <div style={{ marginBottom: '15px', width: '70%' }}>
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            error={!!errors.email}
            helperText={errors.email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: '15px', width: '70%' }}>
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            error={!!errors.password}
            helperText={errors.password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button variant="contained" type="submit">Login</Button>
        <Button onClick={onSwitchToRegister} style={{ marginTop: '10px' }}>
          Don't have an account? Register
        </Button>

        {message && (
          <div
            style={{
              marginTop: '20px',
              textAlign: 'center',
              fontWeight: 'bold',
              color: 'red'
            }}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
}

export default Signin;

