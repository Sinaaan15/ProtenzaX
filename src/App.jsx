import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Account from './pages/Account';

// Wrapper to conditionally render Navbar
const Layout = ({ children, isLoggedIn }) => {
  const location = useLocation();
  // Don't show Navbar on Login page
  const showNavbar = location.pathname !== '/login';

  return (
    <>
      {showNavbar && <Navbar isLoggedIn={isLoggedIn} />}
      {children}
    </>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="bg-background min-h-screen text-white font-sans selection:bg-primary selection:text-black">
        <Layout isLoggedIn={isLoggedIn}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
            <Route path="/account" element={<Account onLogout={() => setIsLoggedIn(false)} />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
