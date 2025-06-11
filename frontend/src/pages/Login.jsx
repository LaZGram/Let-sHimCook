import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const { data } = await axios.post('http://localhost:5000/api/auth/login', {
      email,
      password,
    });
    localStorage.setItem('token', data.token);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Login</h2>
      <input
        className="border p-2 mr-2"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2 mr-2"
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-blue-500 text-white p-2" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;
