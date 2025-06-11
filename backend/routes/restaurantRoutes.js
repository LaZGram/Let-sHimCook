const express = require('express');
const { getAll, create } = require('../controllers/restaurantController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, getAll);
router.post('/', protect, adminOnly, create);

module.exports = router;
