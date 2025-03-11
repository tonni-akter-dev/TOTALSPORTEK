import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { Channel } from '../models/index.js';

const router = express.Router();

// Get all channel
router.get('/channel', async (req, res) => {
  try {
    const channel = await Channel.find().sort({ createdAt: -1 });
    res.json(channel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new channel (protected route)
router.post('/channel', authenticateToken, async (req, res) => {
  try {
    const channel = new Channel(req.body);
    await channel.save();
    res.status(201).json(channel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router; 