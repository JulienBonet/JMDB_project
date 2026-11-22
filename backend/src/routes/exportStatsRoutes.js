const express = require('express');
const { exportCSV, exportSQL, getAdminStats } = require('../controllers/exportStatsController');
const auth = require('../middlewares/authMiddleware');
const adminOnly = require('../middlewares/adminMiddleware');

const router = express.Router();

router.use('/admin', auth, adminOnly);

router.get('/admin/export-csv', exportCSV);
router.get('/admin/export-sql', exportSQL);
router.get('/admin/stats', getAdminStats);

module.exports = router;
