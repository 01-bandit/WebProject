import express from 'express';
import { auth, adminAuth } from '../middleware/auth.js';
import Job from '../models/Job.js';
import User from '../models/User.js';

const router = express.Router();

// Get dashboard stats
router.get('/stats', auth, adminAuth, async (req, res) => {
  try {
    const [totalUsers, totalJobs, jobStats, userStats] = await Promise.all([
      User.countDocuments(),
      Job.countDocuments(),
      Job.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]),
      User.aggregate([
        { $group: { _id: '$role', count: { $sum: 1 } } }
      ])
    ]);

    const stats = {
      totalUsers,
      totalJobs,
      jobsByStatus: Object.fromEntries(
        jobStats.map(({ _id, count }) => [_id, count])
      ),
      usersByRole: Object.fromEntries(
        userStats.map(({ _id, count }) => [_id, count])
      )
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;