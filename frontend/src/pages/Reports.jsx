import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Reports({refresh}) {
  const [expenses, setExpenses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const chartRef = useRef();
useEffect(() => {
  axios.get('http://localhost:5000/api/expenses/get-expenses', {
    headers: {
      Authorization: localStorage.getItem('token')  // ✅ token required
    }
  })
  .then(res => setExpenses(res.data))
  .catch(err => console.error("Fetch Error:", err));
}, [refresh]);



  const filteredExpenses = expenses.filter((exp) => {
    const date = new Date(exp.date);
    return (
      date.getMonth() === Number(selectedMonth) &&
      date.getFullYear() === Number(selectedYear)
    );
  });

  const categoryTotals = {};
  filteredExpenses.forEach(exp => {
    const category = exp.category || 'Uncategorized';
    categoryTotals[category] = (categoryTotals[category] || 0) + Number(exp.amount);
  });

  const totalThisMonth = Object.values(categoryTotals).reduce((acc, val) => acc + val, 0);

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: 'Expenses by Category',
        data: Object.values(categoryTotals),
        backgroundColor: ['#6366f1', '#facc15', '#34d399', '#f87171', '#60a5fa', '#f472b6'],
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  // 📄 PDF Export Handler
  const exportPDF = async () => {
    const canvas = await html2canvas(chartRef.current);
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();

    const title = `Expense Report - ${new Date(selectedYear, selectedMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}`;
    pdf.setFontSize(16);
    pdf.text(title, 10, 15);

    // 🧾 Total
    pdf.setFontSize(12);
    pdf.text(`Total: ₹${totalThisMonth.toFixed(2)}`, 10, 25);

    // 📂 Category-wise Data
    let y = 35;
    Object.entries(categoryTotals).forEach(([category, amount]) => {
      pdf.text(`• ${category}: ₹${amount.toFixed(2)}`, 10, y);
      y += 8;
    });

    // 🧁 Insert Pie Chart Image
    pdf.addImage(imgData, 'PNG', 10, y + 5, pageWidth - 20, 80);

    pdf.save('Expense_Report.pdf');
  };

  return (
    <div className="bg-white p-6 rounded shadow text-gray-700 space-y-6">
      <h2 className="text-2xl font-bold text-indigo-700">📊 Expense Reports</h2>

      {/* 📅 Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border p-2 rounded"
        >
          {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((month, idx) => (
            <option key={idx} value={idx}>{month}</option>
          ))}
        </select>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border p-2 rounded"
        >
          {[2023, 2024, 2025].map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {/* 💰 Summary */}
      <div className="text-indigo-600 font-semibold">
        Total for {new Date(selectedYear, selectedMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}: ₹{totalThisMonth.toFixed(2)}
      </div>

      {/* 📤 Export Button */}
      {filteredExpenses.length > 0 && (
        <button
          onClick={exportPDF}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          📄 Export PDF with Chart & Data
        </button>
      )}

      {/* 🧁 Pie Chart */}
      {filteredExpenses.length === 0 ? (
        <p className="text-gray-500 mt-4">No expenses found for this month.</p>
      ) : (
        <div ref={chartRef} className="w-full max-w-md mx-auto">
          <Pie data={data} />
        </div>
      )}
    </div>
  );
}
