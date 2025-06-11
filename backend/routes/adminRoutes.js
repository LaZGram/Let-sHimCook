const express = require('express');
const { getOrdersByDay, exportOrders } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.get('/orders', protect, adminOnly, getOrdersByDay);
router.get('/orders/export', protect, adminOnly, exportOrders);

module.exports = router;
