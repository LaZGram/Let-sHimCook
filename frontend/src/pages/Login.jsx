import React, { useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';

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
      <div className="mt-4">
        <GoogleLogin
          onSuccess={async (cred) => {
            const { data } = await axios.post(
              'http://localhost:5000/api/auth/google',
              { token: cred.credential }
            );
            localStorage.setItem('token', data.token);
          }}
          onError={() => console.log('Google Login Failed')}
        />
      </div>
    </div>
  );
}

export default Login;
