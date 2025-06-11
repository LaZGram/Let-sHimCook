const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  item: String,
  price: Number,
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, required: true },
  items: [orderItemSchema],
});

module.exports = mongoose.model('Order', orderSchema);
