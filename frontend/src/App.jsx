import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import OrderHistory from './pages/OrderHistory';
import AdminOrders from './pages/AdminOrders';

function App() {
  return (
    <Router>
      <nav className="p-4 bg-gray-800 text-white flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/history">My Orders</Link>
        <Link to="/admin">Admin</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/history" element={<OrderHistory />} />
        <Route path="/admin" element={<AdminOrders />} />
      </Routes>
    </Router>
  );
}

export default App;
