import React from 'react';

export default function ExpenseItem({ exp }) {
  return (
    <div className="p-4 border rounded bg-gray-50 shadow-sm">
      <div className="flex justify-between text-indigo-700 font-semibold">
        ₹{exp.amount}
        <span className="text-sm text-gray-500">{new Date(exp.date).toLocaleDateString()}</span>
      </div>
      <div className="text-gray-700">{exp.category}</div>
      <div className="text-gray-500 text-sm">{exp.description}</div>
    </div>
  );
}
