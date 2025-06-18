// src/pages/auth/Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', form);
      setMsg(res.data.msg || 'Registration successful!');
      setForm({ name: '', email: '', password: '' });
      navigate("/login");
    } catch (err) {
      setMsg(err.response?.data?.msg || 'Error occurred');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow p-6 mt-10 rounded">
      <h2 className="text-2xl font-bold mb-4">📝 Register</h2>
      {msg && <div className="text-sm mb-2 text-indigo-600">{msg}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange}
          className="w-full border p-2 rounded" required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange}
          className="w-full border p-2 rounded" required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange}
          className="w-full border p-2 rounded" required />
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">
          Register
        </button>
      </form>
    </div>
  );
}
