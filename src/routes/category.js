import express from 'express';
import { Category } from '../models/index.js';

const router = express.Router();

// Create a new category
router.post('/categories', async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).send(category);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router; 