import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import PrivateRoute from "./routes/PrivateRoute"; 
import Layout from "./components/layout/Layout"; // ✅ updated path // ✅ import layout
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Reports from "./pages/Reports"; // ✅ Make sure path is correct
import Settings from "./pages/Settings"; 
export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ✅ Wrap with Layout */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
  path="/reports"
  element={
    <PrivateRoute>
      <Layout>
        <Reports />
      </Layout>
    </PrivateRoute>
  }
/>
<Route
  path="/settings"
  element={
    <PrivateRoute>
      <Layout>
        <Settings />
      </Layout>
    </PrivateRoute>
  }
/>

        </Routes>
      </Router>

      <ToastContainer position="top-center" autoClose={2500} />
    </>
  );
}
