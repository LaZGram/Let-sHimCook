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
