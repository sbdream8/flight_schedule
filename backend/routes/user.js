import express from 'express';
const router = express.Router();

// Define your user-related routes here
router.get('/profile', (req, res) => {
  res.send('User profile endpoint');
});

export default router; // Ensure the router is exported as default
