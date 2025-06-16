import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
axios.defaults.withCredentials=true
const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const loadingToast = toast.loading('Registering...');

    try {
      const res = await axios.post('http://localhost:5000/auth/register-user', {
        name,
        email,
        password,
      });

      toast.update(loadingToast, {
        render: 'Registration successful!',
        type: 'success',
        isLoading: false,
        autoClose: 2000,
      });
      toast.success("User registerd successfully")
      localStorage.setItem('User', JSON.stringify(res.data.user));
      navigate('/'); // Or redirect to /login if you want user to login after register
    } catch (err) {
      toast.update(loadingToast, {
        render: err.response?.data?.message || 'Registration failed!',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
      toast.error("Registration Failed")
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-pink-50">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-pink-600 mb-6">Register</h2>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold mb-1">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-pink-400"
            required
          />
        </div>

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
          Register
        </button>

        <p className="mt-4 text-sm text-center">
          Already have an account? <Link to="/login" className="text-pink-600 underline">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
