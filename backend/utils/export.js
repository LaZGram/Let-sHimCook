const csv = require('fast-csv');
const { Readable } = require('stream');

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
