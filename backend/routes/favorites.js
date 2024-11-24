const express = require('express');
const authenticate = require('../middleware/authenticate');
const Favorite = require('../models/Favorite');
const router = express.Router();

// Fetch user's favorite flights
router.get('/favorites', authenticate, async (req, res) => {
    try {
      const response = await axios.get('http://localhost:5001/api/favorites', {
        headers: {
          Authorization: `Bearer ${req.headers.authorization}`,
        },
      });
      res.json(response.data);
    } catch (err) {
      console.error('Error fetching favorites:', err);
      res.status(500).json({ error: 'Failed to fetch favorites.' });
    }
  });
  
// Remove a flight from user's favorites
router.delete('/favorites/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    await Favorite.findOneAndDelete({ _id: id, userId: req.user.id });
    res.json({ message: 'Flight removed from favorites.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to remove favorite flight.' });
  }
});

const response = await axios.get('http://localhost:5001/api/favorites', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  

module.exports = router;
