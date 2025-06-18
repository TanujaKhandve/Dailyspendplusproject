import React, { useEffect, useState } from "react";
import axios from '../../utils/axiosInstance';
import { toast } from "react-toastify";

export default function AddExpense({ onAdd }) {
  const [expense, setExpense] = useState({
    amount: '',
    category: '',
    description: '',
    date: ''
  });
 
  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/expenses/add-expense', expense);
      toast.success("✅ Expense added successfully!");
      onAdd();
      setExpense({ amount: '', category: '', description: '', date: '' });
    } catch (err) {
      console.error("Add Error:", err);
      toast.error("❌ Failed to add expense");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded space-y-4">
      <h2 className="text-xl font-bold">➕ Add Expense</h2>
      <input name="amount" type="number" value={expense.amount} onChange={handleChange} placeholder="Amount" required className="w-full border p-2 rounded" />
      <input name="category" type="text" value={expense.category} onChange={handleChange} placeholder="Category" required className="w-full border p-2 rounded" />
      <input name="description" type="text" value={expense.description} onChange={handleChange} placeholder="Description" className="w-full border p-2 rounded" />
      <input name="date" type="date" value={expense.date} onChange={handleChange} required className="w-full border p-2 rounded" />
      <button type="submit" className="bg-indigo-600 text-white w-full py-2 rounded">Save</button>
    </form>
  );
}
