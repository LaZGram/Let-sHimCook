const mongoose = require('mongoose');

const calendarSchema = new mongoose.Schema({
  date: { type: Date, required: true, unique: true },
  restaurants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }],
});

module.exports = mongoose.model('Calendar', calendarSchema);
