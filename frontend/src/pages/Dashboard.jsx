import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [day, setDay] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchDay = async () => {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('http://localhost:5000/api/calendar/today', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDay(data);
    };
    fetchDay();
  }, []);

  const placeOrder = async () => {
    const token = localStorage.getItem('token');
    await axios.post(
      'http://localhost:5000/api/orders',
      { items },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setItems([]);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Today's Restaurants</h2>
      {day &&
        day.restaurants.map((r) => (
          <div key={r._id} className="mb-2">
            <h3 className="font-bold">{r.name}</h3>
            {r.menu.map((m) => (
              <label key={m.name} className="block">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setItems([...items, { restaurant: r._id, item: m.name, price: m.price }]);
                    } else {
                      setItems(items.filter((it) => it.item !== m.name));
                    }
                  }}
                />
                {m.name} - ${m.price}
              </label>
            ))}
          </div>
        ))}
      <button className="bg-green-500 text-white p-2 mt-4" onClick={placeOrder}>
        Place Order
      </button>
    </div>
  );
}

export default Dashboard;
