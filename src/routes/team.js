import express from 'express';
import { Team } from '../models/index.js';

const router = express.Router();

router.get('/teams', async (req, res) => {
  try {
    const teams = await Team.find().sort({ createdAt: -1 });
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
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



