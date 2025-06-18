// src/routes/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');

  // ✅ If token exists → allow access
  if (token) {
    return children;
  }

  // ❌ If not logged in → redirect to login
  return <Navigate to="/login" />;
}
