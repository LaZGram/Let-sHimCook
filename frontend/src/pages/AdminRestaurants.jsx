import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [name, setName] = useState('');
  const token = localStorage.getItem('token');

  const load = async () => {
    const { data } = await axios.get('http://localhost:5000/api/restaurants', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setRestaurants(data);
  };

  useEffect(() => {
    load();
  }, []);

  const create = async () => {
    await axios.post(
      'http://localhost:5000/api/restaurants',
      { name },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setName('');
    load();
  };

  const editRestaurant = async (id) => {
    const newName = prompt('Restaurant name');
    if (!newName) return;
    await axios.put(
      `http://localhost:5000/api/restaurants/${id}`,
      { name: newName },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    load();
  };

  const deleteRestaurant = async (id) => {
    await axios.delete(`http://localhost:5000/api/restaurants/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    load();
  };

  const addMenu = async (id) => {
    const itemName = prompt('Item name');
    const price = parseFloat(prompt('Price'));
    if (!itemName) return;
    await axios.post(
      `http://localhost:5000/api/restaurants/${id}/menu`,
      { name: itemName, price },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    load();
  };

  const editMenu = async (rId, item) => {
    const name = prompt('Item name', item.name);
    const price = parseFloat(prompt('Price', item.price));
    await axios.put(
      `http://localhost:5000/api/restaurants/${rId}/menu/${item._id}`,
      { name, price },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    load();
  };

  const deleteMenu = async (rId, itemId) => {
    await axios.delete(
      `http://localhost:5000/api/restaurants/${rId}/menu/${itemId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    load();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-2">Manage Restaurants</h2>
      <div className="mb-4">
        <input
          className="border p-2 mr-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Restaurant name"
        />
        <button className="bg-blue-500 text-white p-2" onClick={create}>
          Add Restaurant
        </button>
      </div>
      {restaurants.map((r) => (
        <div key={r._id} className="border p-2 mb-2">
          <div className="flex items-center mb-1">
            <h3 className="font-bold flex-1">{r.name}</h3>
            <button
              className="mr-2 text-sm text-blue-500"
              onClick={() => editRestaurant(r._id)}
            >
              Edit
            </button>
            <button
              className="text-sm text-red-500"
              onClick={() => deleteRestaurant(r._id)}
            >
              Delete
            </button>
          </div>
          <ul className="ml-4">
            {r.menu.map((m) => (
              <li key={m._id} className="flex items-center">
                <span className="flex-1">
                  {m.name} - ${m.price}
                </span>
                <button
                  className="mr-2 text-xs text-blue-500"
                  onClick={() => editMenu(r._id, m)}
                >
                  Edit
                </button>
                <button
                  className="text-xs text-red-500"
                  onClick={() => deleteMenu(r._id, m._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <button
            className="text-xs text-green-600 mt-1"
            onClick={() => addMenu(r._id)}
          >
            Add Menu Item
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminRestaurants;
