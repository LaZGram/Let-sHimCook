const Order = require('../models/Order');
const Restaurant = require('../models/Restaurant');
const { exportOrdersCSV, exportOrdersExcel } = require('../utils/export');

exports.getOrdersByDay = async (req, res) => {
  const { date, restaurantId } = req.query;
  const filter = { date: new Date(date) };
  if (restaurantId) filter['items.restaurant'] = restaurantId;
  const orders = await Order.find(filter).populate('items.restaurant user');
  res.json(orders);
};

exports.exportOrders = async (req, res) => {
  const { date, restaurantId } = req.query;
  const filter = { date: new Date(date) };
  if (restaurantId) filter['items.restaurant'] = restaurantId;
  const orders = await Order.find(filter).populate('items.restaurant user');
  const csv = await exportOrdersCSV(orders);
  res.header('Content-Type', 'text/csv');
  res.attachment('orders.csv');
  return res.send(csv);
};

exports.exportOrdersExcel = async (req, res) => {
  const { date, restaurantId } = req.query;
  const filter = { date: new Date(date) };
  if (restaurantId) filter['items.restaurant'] = restaurantId;
  const orders = await Order.find(filter).populate('items.restaurant user');
  const buffer = await exportOrdersExcel(orders);
  res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.attachment('orders.xlsx');
  return res.send(buffer);
};
