import express from 'express';
const router = express.Router();

// Define your authentication routes here
router.post('/login', (req, res) => {
  res.send('Login endpoint');
});

router.post('/signup', (req, res) => {
  res.send('Signup endpoint');
});

export default router; // Ensure the router is exported as default
