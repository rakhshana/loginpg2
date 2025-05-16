import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import MainNavigation from "../layout/MainNavigation";
import { TextField, Button } from "@mui/material";

function UserProfile({ onLogout }) {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    phoneno: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const email = Cookies.get("userEmail") || "";
    const password = Cookies.get("userPassword") || "";
    const phoneno = Cookies.get("userPhoneno") || "";
    setUserDetails({ email, password, phoneno });
  }, []);

  const handleChange = (e) => {
    setUserDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Profile updated successfully!");
        Cookies.set("userPassword", userDetails.password);
        Cookies.set("userPhoneno", userDetails.phoneno);
      } else {
        setMessage(`Update failed: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      setMessage(`Network error: ${error.message}`);
    }
  };

  return (
    <div>
      <MainNavigation onLogout={onLogout} />
      <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
        <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
          User Profile
        </h2>

        <TextField
          label="Email"
          variant="filled"
          value={userDetails.email}
          name="email"
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true, // Email is usually not editable for login consistency
          }}
        />

        <TextField
          label="Password"
          type="password"
          variant="filled"
          value={userDetails.password}
          name="password"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          label="Phone Number"
          variant="filled"
          value={userDetails.phoneno}
          name="phoneno"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "1rem" }}
          onClick={handleSave}
        >
          Save
        </Button>

        {message && (
          <p style={{ textAlign: "center", marginTop: "1rem", color: "green" }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
