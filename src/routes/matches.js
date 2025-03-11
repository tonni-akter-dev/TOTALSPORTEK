import express from 'express';
import { Match } from '../models/Match.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Submit new match (protected route)
router.post('/matches', authenticateToken, async (req, res) => {
  console.log(req, "req user mail");
  try {
    const match = new Match({
      ...req.body,
      submittedBy: req.user.email
    });
    await match.save();
    res.status(201).json(match);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all matches (admin only)
router.get('/matches', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    const matches = await Match.find().sort({ createdAt: -1 });
    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update match status (admin only)
router.patch('/matches/:id', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    const match = await Match.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(match);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a match (admin only)
router.delete('/matches/:id', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    const match = await Match.findByIdAndDelete(req.params.id);
    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }
    res.json({ message: 'Match deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


export default router; 