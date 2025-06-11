const express = require('express');
const {
  getAll,
  create,
  update,
  remove,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = require('../controllers/restaurantController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, getAll);
router.post('/', protect, adminOnly, create);
router.put('/:id', protect, adminOnly, update);
router.delete('/:id', protect, adminOnly, remove);
router.post('/:id/menu', protect, adminOnly, addMenuItem);
router.put('/:id/menu/:itemId', protect, adminOnly, updateMenuItem);
router.delete('/:id/menu/:itemId', protect, adminOnly, deleteMenuItem);

module.exports = router;
