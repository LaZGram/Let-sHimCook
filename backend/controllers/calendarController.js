const Calendar = require('../models/Calendar');

exports.getToday = async (req, res) => {
  const today = new Date().setHours(0, 0, 0, 0);
  const day = await Calendar.findOne({ date: today }).populate('restaurants');
  res.json(day);
};

exports.setDay = async (req, res) => {
  try {
    const { date, restaurants } = req.body;
    const day = await Calendar.findOneAndUpdate(
      { date },
      { restaurants },
      { upsert: true, new: true }
    );
    res.json(day);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
