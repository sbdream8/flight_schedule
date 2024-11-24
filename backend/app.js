const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const favoritesRoutes = require('./routes/favorites'); // Import the favorites route
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', authRoutes);      // Authentication routes
app.use('/api', userRoutes);      // User-related routes
app.use('/api', favoritesRoutes); // Favorites routes

// Start server
const PORT = process.env.PORT || 5001; // Change to 5001
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

//error handling to MongoDB connection in app.js
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the app if the connection fails
  });

