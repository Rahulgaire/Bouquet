import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

axios.defaults.withCredentials = true;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/auth/login-user', {
        email,
        password,
      });

      alert("Login successful!");

      localStorage.setItem('user', JSON.stringify(res.data.data.user));
      localStorage.setItem('token', res.data.data.token);

      if (res.data.data.user.role === 'admin') {
        navigate('/dashboard/');
      } else {
        navigate('/');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-pink-50">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-pink-600 mb-6">Login</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold mb-1">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-pink-400"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-semibold mb-1">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-pink-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition"
        >
          Login
        </button>

        <p className="mt-4 text-sm text-center">
          Don't have an account? <Link to="/register" className="text-pink-600 underline">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
