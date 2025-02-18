import express from 'express';
import { Event } from '../models/index.js';

const router = express.Router();

router.get('/most-watched', async (req, res) => {
  try {
    const mostWatchedStream = await Event.findOne({ isLive: true })
      .sort({ viewCount: -1 })
      .limit(1);
    
    res.json(mostWatchedStream);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/live', async (req, res) => {
  try {
    const liveStreams = await Event.find({ 
      isLive: true 
    }).sort({ 
      viewCount: -1 
    });
    
    res.json(liveStreams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router; 