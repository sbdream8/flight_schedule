import express from 'express';
const router = express.Router();

// Example route
router.get('/profile', (req, res) => {
  res.json({ message: 'User profile endpoint' });
});

export default router; // Ensure the router is exported as default
