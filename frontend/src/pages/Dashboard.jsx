import React, { useState } from "react";
import AddExpense from "../components/dashboard/AddExpense";
import ExpenseList from "../components/dashboard/ExpenseList";
import Reports from "../pages/Reports";

export default function Dashboard() {
  const [refresh, setRefresh] = useState(null);

  const handleRefresh = () => {
    setRefresh(Date.now()); // ⏱️ triggers re-fetch in ExpenseList and Reports
  };

  return (
    <div className="space-y-8">
      <AddExpense onAdd={handleRefresh} />
      <ExpenseList refresh={refresh} />
      <Reports refresh={refresh} /> {/* ✅ Pass refresh here too */}
    </div>
  );
}
