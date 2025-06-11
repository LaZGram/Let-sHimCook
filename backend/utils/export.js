const csv = require('fast-csv');
const { Readable } = require('stream');
const ExcelJS = require('exceljs');

exports.exportOrdersCSV = (orders) => {
  const rows = [];
  orders.forEach((o) => {
    o.items.forEach((i) => {
      rows.push({
        user: o.user.name,
        restaurant: i.restaurant.name,
        item: i.item,
        price: i.price,
        date: o.date.toISOString().split('T')[0],
      });
    });
  });
  const stream = Readable.from(rows);
  return new Promise((resolve, reject) => {
    const chunks = [];
    csv
      .write(stream, { headers: true })
      .on('data', (chunk) => chunks.push(chunk))
      .on('end', () => resolve(Buffer.concat(chunks)))
      .on('error', reject);
  });
};

exports.exportOrdersExcel = async (orders) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Orders');
  sheet.columns = [
    { header: 'User', key: 'user' },
    { header: 'Restaurant', key: 'restaurant' },
    { header: 'Item', key: 'item' },
    { header: 'Price', key: 'price' },
    { header: 'Date', key: 'date' },
  ];
  orders.forEach((o) => {
    o.items.forEach((i) => {
      sheet.addRow({
        user: o.user.name,
        restaurant: i.restaurant.name,
        item: i.item,
        price: i.price,
        date: o.date.toISOString().split('T')[0],
      });
    });
  });
  return workbook.xlsx.writeBuffer();
};
