import React, { useState, useEffect } from 'react';
import Signin from './Signin';
import Register from './Register';
import NewsFeed from './NewsFeed';
import Cookies from 'js-cookie';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false); // 🔁 Track login/register screen

  useEffect(() => {
    const loggedInCookie = Cookies.get('isLoggedIn');
    if (loggedInCookie === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    Cookies.set('isLoggedIn', 'true', { expires: 7 });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    Cookies.remove('isLoggedIn');
    setShowRegister(false); 
  };

  return (
    <div>
      {isLoggedIn ? (
        <NewsFeed onLogout={handleLogout} />
      ) : showRegister ? (
        <Register onRegisterSuccess={handleLoginSuccess} onSwitchToLogin={() => setShowRegister(false)} />
      ) : (
        <Signin onLoginSuccess={handleLoginSuccess} onSwitchToRegister={() => setShowRegister(true)} />
      )}
    </div>
  );
}

export default App;
