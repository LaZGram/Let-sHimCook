const express = require('express');
const {
  getOrdersByDay,
  exportOrders,
  exportOrdersExcel,
} = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.get('/orders', protect, adminOnly, getOrdersByDay);
router.get('/orders/export', protect, adminOnly, exportOrders);
router.get('/orders/export/excel', protect, adminOnly, exportOrdersExcel);

module.exports = router;
