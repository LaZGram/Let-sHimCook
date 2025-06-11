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
