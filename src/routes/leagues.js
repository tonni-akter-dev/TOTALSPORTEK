import express from 'express';
import { League } from '../models/League.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all leagues
router.get('/leagues', async (req, res) => {
  try {
    const leagues = await League.find().sort({ createdAt: -1 });
    res.json(leagues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new league (protected route)
router.post('/leagues', authenticateToken, async (req, res) => {
  try {
    const league = new League(req.body);
    await league.save();
    res.status(201).json(league);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router; 