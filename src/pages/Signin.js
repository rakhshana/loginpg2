import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import Cookies from "js-cookie";

function Signin({ onLoginSuccess, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const signinurl = process.env.REACT_APP_API_SIGNIN;

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch(signinurl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const { phoneno } = data;
        Cookies.set("isLoggedIn", "true", { expires: 7 });
        Cookies.set("userEmail", email);
        Cookies.set("userPassword", password);
        if (phoneno) Cookies.set("userPhoneno", phoneno);
        setMessage(`Login successful!`);
        onLoginSuccess();
      } else {
        setMessage(`Login failed: ${data.error || "Invalid credentials"}`);
      }
    } catch (error) {
      setMessage(`Network error: ${error.message}`);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url('/images/news2.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          border: "1px solid #ccc",
          padding: "40px",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
          width: "300px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2>Login</h2>

        <TextField
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          error={!!errors.email}
          helperText={errors.email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          style={{ marginBottom: "15px" }}
        />

        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          error={!!errors.password}
          helperText={errors.password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          style={{ marginBottom: "15px" }}
        />

        <Button variant="contained" type="submit" fullWidth>
          Login
        </Button>
        <Button
          onClick={onSwitchToRegister}
          style={{ marginTop: "10px" }}
          fullWidth
        >
          Don't have an account? Register
        </Button>

        {message && (
          <div style={{ marginTop: "20px", color: "red", textAlign: "center" }}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
}

export default Signin;
