import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiHome, FiPieChart, FiSettings, FiLogOut, FiUser } from "react-icons/fi";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    navigate("/login"); // Redirect to login
  };

  return (
    <div className="w-64 min-h-screen bg-indigo-700 text-white px-6 py-6 flex flex-col justify-between">
      <div>
        {/* 👤 Profile Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <FiUser className="text-2xl" />
            <div>
              <p className="font-semibold">Welcome,</p>
              <p className="text-sm text-gray-200">Tanuja 👋</p>
            </div>
          </div>
        </div>

        {/* 🔗 Navigation */}
        <nav className="space-y-3">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-indigo-600 ${
                isActive ? "bg-indigo-600" : ""
              }`
            }
          >
            <FiHome className="text-xl" />
            Dashboard
          </NavLink>

          <NavLink
            to="/reports"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-indigo-600 ${
                isActive ? "bg-indigo-600" : ""
              }`
            }
          >
            <FiPieChart className="text-xl" />
            Reports
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-indigo-600 ${
                isActive ? "bg-indigo-600" : ""
              }`
            }
          >
            <FiSettings className="text-xl" />
            Settings
          </NavLink>
        </nav>
      </div>

      {/* 🚪 Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 text-left px-3 py-2 hover:bg-indigo-600 rounded-md text-white"
      >
        <FiLogOut className="text-xl" />
        Logout
      </button>
    </div>
  );
}
