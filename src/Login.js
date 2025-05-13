import React, { useState } from 'react';
import axios from 'axios';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [userData, setUserData] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();


    if (email === 'test@example.com' && password === 'password123') {
      setMessage(' Login successful!');
      
      try {
        
        const response = await axios.get('https://jsonplaceholder.typicode.com/users/1');
        setUserData(response.data); 
      } catch (error) {
        setMessage(' Failed to fetch user data');
      }
    } else {
      setMessage(' Login failed: Incorrect email or password');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
      <form onSubmit={handleLogin} style={{
        border: '1px solid #ccc',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        width: '300px'
      }}>
        <h2 style={{ textAlign: 'center' }}>Login</h2>

        <div style={{ marginBottom: '15px' }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <button type="submit" style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
          Login
        </button>

        {message && (
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            {message}
          </div>
        )}

        {userData && (
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <h3>User Information</h3>
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Phone:</strong> {userData.phone}</p>
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;
