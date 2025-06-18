// Load required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const expenseRoutes = require('./routes/ExpenseRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
// Create an Express app
const app = express();

// Middleware to handle JSON and CORS
app.use(cors());
app.use(express.json());
// Import routes
app.use('/api/expenses', expenseRoutes);
app.use('/api/auth', authRoutes);    // login, register
app.use('/api/users', userRoutes);   // profile, password
// Test route to check server is working
app.get('/', (req, res) => {
  res.send('🎉 Server is running');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');

    // Start the server after DB is connected
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });

