import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminCalendar() {
  const [restaurants, setRestaurants] = useState([]);
  const [date, setDate] = useState('');
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');

  useEffect(() => {
    const load = async () => {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('http://localhost:5000/api/restaurants', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRestaurants(data);
    };
    load();
  }, []);

  const save = async () => {
    const token = localStorage.getItem('token');
    await axios.post(
      'http://localhost:5000/api/calendar',
      { date, restaurants: [first, second] },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Set Daily Restaurants</h2>
      <input
        type="date"
        className="border p-2 mb-2"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <div className="mb-2">
        <select
          className="border p-2 mr-2"
          value={first}
          onChange={(e) => setFirst(e.target.value)}
        >
          <option value="">Select first restaurant</option>
          {restaurants.map((r) => (
            <option key={r._id} value={r._id}>
              {r.name}
            </option>
          ))}
        </select>
        <select
          className="border p-2"
          value={second}
          onChange={(e) => setSecond(e.target.value)}
        >
          <option value="">Select second restaurant</option>
          {restaurants.map((r) => (
            <option key={r._id} value={r._id}>
              {r.name}
            </option>
          ))}
        </select>
      </div>
      <button className="bg-blue-500 text-white p-2" onClick={save}>
        Save
      </button>
    </div>
  );
}

export default AdminCalendar;
