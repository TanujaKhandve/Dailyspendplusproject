const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const protect = require('../middleware/authMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

// 🔐 All routes below will require auth!

// backend/routes/expenseRoutes.js
router.post('/add-expense', authMiddleware, async (req, res) => {
  const { amount, category, description, date } = req.body;

  console.log("📥 Add Expense Request Body:", req.body);
  console.log("👤 Authenticated User ID:", req.userId);

  if (!amount || !category || !date) {
    return res.status(400).json({ msg: 'Missing required fields' });
  }

  try {
    const expense = new Expense({
      amount,
      category,
      description,
      date,
      user: req.userId, // ✅ Not userId: req.userId
    });
    await expense.save();
    console.log("✅ Expense saved to DB:", expense);
    res.status(201).json(expense);
  } catch (err) {
    console.error("❌ Error while saving expense:", err);
    res.status(500).json({ msg: 'Server error' });
  }
});


router.get('/get-expenses', authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.userId }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching expenses' });
  }
});

module.exports = router;
