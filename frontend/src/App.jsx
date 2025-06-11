import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import OrderHistory from './pages/OrderHistory';
import AdminOrders from './pages/AdminOrders';
import AdminCalendar from './pages/AdminCalendar';
import AdminRestaurants from './pages/AdminRestaurants';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <Router>
      <nav className="p-4 bg-gray-800 text-white flex gap-4 items-center">
        <Link to="/">Home</Link>
        <Link to="/history">My Orders</Link>
        <Link to="/admin">Admin Orders</Link>
        <Link to="/admin/calendar">Admin Calendar</Link>
        <Link to="/admin/restaurants">Admin Restaurants</Link>
        <div className="ml-auto flex items-center gap-2">
          {user && (
            <>
              <img src={user.picture} alt="profile" className="w-8 h-8 rounded-full" />
              <span>{user.name || user.email}</span>
              <button className="bg-red-500 px-2 py-1 rounded" onClick={logout}>
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/history" element={<OrderHistory />} />
        <Route path="/admin" element={<AdminOrders />} />
        <Route path="/admin/calendar" element={<AdminCalendar />} />
        <Route path="/admin/restaurants" element={<AdminRestaurants />} />
      </Routes>
    </Router>
  );
}

export default App;
