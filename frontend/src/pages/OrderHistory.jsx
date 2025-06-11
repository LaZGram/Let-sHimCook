import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('http://localhost:5000/api/orders/mine', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(data);
    };
    fetchOrders();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">My Orders</h2>
      {orders.map((o) => (
        <div key={o._id} className="mb-2">
          {o.items.map((i) => (
            <div key={i.item}>
              {i.restaurant.name} - {i.item} (${i.price})
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default OrderHistory;
