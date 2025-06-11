const express = require('express');
const { placeOrder, userOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, placeOrder);
router.get('/mine', protect, userOrders);

module.exports = router;
