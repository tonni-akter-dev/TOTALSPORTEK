import express from 'express';
import { Team } from '../models/index.js';

const router = express.Router();

// Create a new team
router.post('/teams', async (req, res) => {
  try {
    const team = new Team(req.body);
    await team.save();
    res.status(201).send(team);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router; 