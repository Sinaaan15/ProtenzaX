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

import { CartProvider } from './context/CartContext';
import CartDrawer from './components/CartDrawer';

// ... Layout definition ...

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <CartProvider>
      <Router>
        <div className="bg-background min-h-screen text-white font-sans selection:bg-primary selection:text-black">
          <CartDrawer />
          <Layout isLoggedIn={isLoggedIn}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
              <Route path="/account" element={<Account onLogout={() => setIsLoggedIn(false)} />} />
            </Routes>
          </Layout>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
