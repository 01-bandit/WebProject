import express from 'express';
import { auth, adminAuth } from '../middleware/auth.js';
import Job from '../models/Job.js';

const router = express.Router();

// Get all jobs with filters
router.get('/', auth, adminAuth, async (req, res) => {
  try {
    const { status } = req.query;
    const query = status && status !== 'all' ? { status } : {};
    const jobs = await Job.find(query).populate('employer', 'email company');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update job status
router.patch('/:id/status', auth, adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    );
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete job
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;