const express = require('express');
const { getToday, setDay } = require('../controllers/calendarController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.get('/today', protect, getToday);
router.post('/', protect, adminOnly, setDay);

module.exports = router;
