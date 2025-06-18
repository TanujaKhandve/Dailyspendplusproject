import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { FiTrash2 } from 'react-icons/fi';

export default function ExpenseList({ refresh }) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true); // 🔄 Loading state

  // ✅ Fetch expenses from backend
  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get('/expenses/get-expenses')
      .then(res => {
  console.log("Fetched:", res.data); // 🧪 View in browser console
  setExpenses(res.data);
})

      .catch(() => {
        toast.error('❌ Failed to fetch expenses');
      })
      .finally(() => setLoading(false));
  }, [refresh]);

  // 🗑️ Delete handler
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this expense?')) return;

    try {
      await axiosInstance.delete(`/expenses/delete-expense/${id}`);
      toast.success('✅ Expense deleted');
      setExpenses(prev => prev.filter(exp => exp._id !== id)); // ⛔ Remove from UI
    } catch (err) {
      toast.error('❌ Failed to delete expense');
    }
  };

  return (
    <div className="bg-white p-6 rounded-md shadow space-y-4">
      <h3 className="text-xl font-bold text-indigo-700">🧾 All Expenses</h3>

      {loading ? (
        <p className="text-gray-400 text-sm">Loading expenses...</p>
      ) : expenses.length === 0 ? (
        <p className="text-gray-500">No expenses added yet.</p>
      ) : (
        <ul className="space-y-4">
          {expenses.map(exp => (
            <li
              key={exp._id}
              className="flex justify-between items-center bg-gray-50 hover:bg-indigo-50 transition p-3 rounded-md shadow-sm"
            >
              <div>
                <p
                  className={`text-lg font-semibold ${
                    exp.amount > 1000 ? 'text-red-600' : 'text-green-700'
                  }`}
                >
                  ₹{exp.amount}
                  <span className="text-sm text-gray-500 ml-2">
                    ({exp.description || 'No description'})
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  {format(new Date(exp.date), 'dd MMM yyyy')}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    exp.category?.toLowerCase() === 'food'
                      ? 'bg-yellow-100 text-yellow-700'
                      : exp.category?.toLowerCase() === 'travel'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-indigo-100 text-indigo-700'
                  }`}
                >
                  {exp.category || 'Other'}
                </span>

                <FiTrash2
                  title="Delete expense"
                  className="text-red-500 hover:text-red-700 cursor-pointer text-lg"
                  onClick={() => handleDelete(exp._id)}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
