import React, { useState, useEffect } from 'react';

function Signin({ onLoginSuccess}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'reqres-free-v1'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(` Login successful! Token: ${data.token}`);
        onLoginSuccess();
      } else {
        setMessage(` Login failed: ${data.error}`);
      }
    } catch (error) {
      setMessage(` Network error: ${error.message}`);
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

        <div style={{ marginBottom: '15px', width: '100%' }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              height: '30px',
              borderRadius: '6px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px', width: '100%' }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              height: '30px',
              borderRadius: '6px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            marginTop: '10px',
          }}
        >
          Login
        </button>

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
