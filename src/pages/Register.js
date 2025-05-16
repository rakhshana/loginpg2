import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import Cookies from "js-cookie";

function Register({ onRegisterSuccess, onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfrmpassword, setConfirmPassword] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const apiregister = process.env.REACT_APP_API_REGISTER;

  const validateForm = () => {
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneno)) {
      newErrors.phoneno = "Phone number must be 10 digits";
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
      newErrors.password =
        "Password must be at least 6 characters and include letters and numbers";
    }

    if (password !== cnfrmpassword) {
      newErrors.cnfrmpassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch(apiregister, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, phoneno }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Registration successful!");
        Cookies.set("userEmail", email);
        Cookies.set("userPassword", password);
        Cookies.set("userPhoneno", phoneno);

        onRegisterSuccess();
      } else {
        setMessage(`Registration failed: ${data.error}`);
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
      <div
        style={{ display: "flex", justifyContent: "center", padding: "50px" }}
      >
        <form
          onSubmit={handleRegister}
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
          <h2>Register</h2>

          <div style={{ marginBottom: "15px", width: "70%" }}>
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
            />
          </div>

          <div style={{ marginBottom: "15px", width: "70%" }}>
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
            />
          </div>

          <div style={{ marginBottom: "15px", width: "70%" }}>
            <TextField
              label="Confirm Password"
              variant="outlined"
              type="password"
              value={cnfrmpassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!errors.cnfrmpassword}
              helperText={errors.cnfrmpassword}
            />
          </div>

          <div style={{ marginBottom: "15px", width: "70%" }}>
            <TextField
              label="Phone no"
              variant="outlined"
              type="tel"
              value={phoneno}
              required
              onChange={(e) => setPhoneno(e.target.value)}
              error={!!errors.phoneno}
              helperText={errors.phoneno}
            />
          </div>

          <Button variant="contained" type="submit">
            Register
          </Button>
          <Button onClick={onSwitchToLogin} style={{ marginTop: "10px" }}>
            Already have an account? Login
          </Button>

          {message && (
            <div
              style={{ marginTop: "20px", color: "red", textAlign: "center" }}
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Register;
