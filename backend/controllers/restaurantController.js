const Restaurant = require('../models/Restaurant');

exports.getAll = async (req, res) => {
  const restaurants = await Restaurant.find();
  res.json(restaurants);
};

exports.create = async (req, res) => {
  try {
    const restaurant = await Restaurant.create(req.body);
    res.json(restaurant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(restaurant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Restaurant.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.addMenuItem = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    restaurant.menu.push(req.body);
    await restaurant.save();
    res.json(restaurant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateMenuItem = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    const item = restaurant.menu.id(req.params.itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    item.name = req.body.name;
    item.price = req.body.price;
    await restaurant.save();
    res.json(restaurant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteMenuItem = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    const item = restaurant.menu.id(req.params.itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    item.remove();
    await restaurant.save();
    res.json(restaurant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
