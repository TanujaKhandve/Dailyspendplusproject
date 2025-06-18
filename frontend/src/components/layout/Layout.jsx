import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="p-6 bg-white rounded-tl-3xl shadow-md flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
