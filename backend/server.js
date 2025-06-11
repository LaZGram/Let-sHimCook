const connectDB = require("./config/db");
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routes/authRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const orderRoutes = require('./routes/orderRoutes');
const calendarRoutes = require('./routes/calendarRoutes');
const adminRoutes = require('./routes/adminRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => res.send('Office Food Ordering API'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
