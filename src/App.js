import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Signin from "./pages/Signin";
import Register from "./pages/Register";
import NewsFeed from "./pages/NewsFeed";
import UserProfile from "./pages/UserProfile";
import Cookies from "js-cookie";
import Logout from "./components/Logout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [redirectPath, setRedirectPath] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInCookie = Cookies.get("isLoggedIn");
    setIsLoggedIn(loggedInCookie === "true");
  }, []);

  useEffect(() => {
    if (redirectPath) {
      navigate(redirectPath);
      setRedirectPath(null);
    }
  }, [redirectPath, navigate]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    Cookies.set("isLoggedIn", "true", { expires: 7 });
    setRedirectPath("/news-feed");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    Cookies.remove("isLoggedIn");
    setRedirectPath("/");
  };

  const switchToRegister = () => {
    setRedirectPath("/register");
  };

  const switchToLogin = () => {
    setRedirectPath("/");
  };

  if (isLoggedIn === null) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>
    );
  }

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/news-feed" />
            ) : (
              <Signin
                onLoginSuccess={handleLoginSuccess}
                onSwitchToRegister={switchToRegister}
              />
            )
          }
        />
        <Route
          path="/register"
          element={
            <Register
              onRegisterSuccess={handleLoginSuccess}
              onSwitchToLogin={switchToLogin}
            />
          }
        />
        <Route
          path="/news-feed"
          element={
            isLoggedIn ? (
              <NewsFeed onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/user-profile"
          element={isLoggedIn ? <UserProfile /> : <Navigate to="/" />}
        />
        <Route
          path="/logout"
          element={
            isLoggedIn ? (
              <Logout onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    </div>
  );
}

export default App;
