import React, { useState } from 'react';
import Signin from './Signin';
import NewsFeed from './NewsFeed';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    
    
  };

  return (
    <div>
      {isLoggedIn ? (
        <NewsFeed onLogout={handleLogout} />
      ) : (
        <Signin onLoginSuccess={handleLoginSuccess}   />
      )}
    </div>
  );
}

export default App;
