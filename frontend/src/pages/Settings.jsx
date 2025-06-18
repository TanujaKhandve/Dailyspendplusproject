import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance'; // ✅ Use instance
import { toast } from 'react-toastify';

export default function Settings() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState('dark');

  // ✅ Load current user info
  useEffect(() => {
  axiosInstance.get('/users/me')
    .then(res => {
      if (!res.data) {
        toast.error('⚠️ No user data received');
        return;
      }

      // Optional: Log to check what you’re receiving
      console.log('Profile:', res.data);

      // Defensive check before accessing name/email
      setName(res.data.name || '');
      setEmail(res.data.email || '');
    })
    .catch((err) => {
      console.error("Profile Fetch Error:", err);
      toast.error('❌ Failed to load profile');
    });
}, []);


  // ✅ Update profile
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    axiosInstance.put('/users/update-profile', { name, email })
      .then(() => toast.success('✅ Profile updated!'))
      .catch(() => toast.error('❌ Failed to update profile'));
  };

  // ✅ Change password
  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error('⚠️ Password too short');
      return;
    }

    axiosInstance.put('/users/change-password', { newPassword: password })
      .then(() => {
        toast.success('🔒 Password updated');
        setPassword('');
      })
      .catch(() => toast.error('❌ Password change failed'));
  };

  // ⚙️ Theme and Notification Toggles
  const handleThemeToggle = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  const handleNotificationToggle = () => setNotifications(prev => !prev);

  return (
    <div className="bg-white p-6 rounded shadow text-gray-800 space-y-8">
      <h2 className="text-2xl font-bold text-indigo-700">⚙️ Settings</h2>

      {/* 👤 Profile Update */}
      <form onSubmit={handleProfileUpdate} className="space-y-3">
        <h3 className="text-lg font-semibold">👤 Update Profile Info</h3>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border p-2 rounded" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-2 rounded" />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Save Profile</button>
      </form>

      {/* 🔒 Password Update */}
      <form onSubmit={handlePasswordChange} className="space-y-3">
        <h3 className="text-lg font-semibold">🔒 Change Password</h3>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border p-2 rounded" />
        <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Update Password</button>
      </form>

      {/* 🌗 Theme */}
      <div>
        <h3 className="text-lg font-semibold">🌗 Theme</h3>
        <button onClick={handleThemeToggle} className={`px-4 py-2 rounded text-white ${theme === "light" ? "bg-gray-800" : "bg-yellow-400 text-black"}`}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </div>

      {/* 🔔 Notifications */}
      <div>
        <h3 className="text-lg font-semibold">🔔 Notifications</h3>
        <label className="flex gap-2 items-center">
          <input type="checkbox" checked={notifications} onChange={handleNotificationToggle} />
          Email Notifications
        </label>
      </div>
    </div>
  );
}
