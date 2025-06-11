const Order = require('../models/Order');

exports.placeOrder = async (req, res) => {
  try {
    const order = await Order.create({
      user: req.user.id,
      date: new Date(),
      items: req.body.items,
    });
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.userOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).populate('items.restaurant');
  res.json(orders);
};
