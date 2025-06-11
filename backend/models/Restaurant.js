const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  menu: [menuItemSchema],
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
