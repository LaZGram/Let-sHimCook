import React, { useState } from 'react';
import axios from 'axios';

function AdminOrders() {
  const [date, setDate] = useState('');
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const token = localStorage.getItem('token');
    const { data } = await axios.get('http://localhost:5000/api/admin/orders', {
      headers: { Authorization: `Bearer ${token}` },
      params: { date },
    });
    setOrders(data);
  };

  const exportCSV = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:5000/api/admin/orders/export', {
      headers: { Authorization: `Bearer ${token}` },
      params: { date },
      responseType: 'blob',
    });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'orders.csv');
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Admin Orders</h2>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 mr-2"
      />
      <button className="bg-blue-500 text-white p-2 mr-2" onClick={fetchOrders}>
        Load
      </button>
      <button className="bg-green-500 text-white p-2" onClick={exportCSV}>
        Export CSV
      </button>
      {orders.map((o) => (
        <div key={o._id} className="mt-2 border p-2">
          {o.user.name} -
          {o.items.map((i) => (
            <span key={i.item} className="ml-2">
              {i.restaurant.name} {i.item}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default AdminOrders;
