import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    axios.post("http://localhost:5000/api/auth/login", {
      email,
      password
    })
    .then(res => {
      const token = res.data.token;
      localStorage.setItem("token", token); // ✅ store token
      setMsg("✅ Login successful!");
      navigate("/dashboard"); // ✅ redirect to dashboard
    })
    .catch(err => {
      console.error(err);
      setMsg("❌ Login failed. Please check credentials.");
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow p-6 mt-10 rounded">
      <h2 className="text-2xl font-bold mb-4">🔐 Login</h2>
      {msg && <div className="text-sm mb-2 text-red-500">{msg}</div>}

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
