const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: Number,
  category: String,
  description: String,
  date: Date
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
