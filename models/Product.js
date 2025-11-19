// import prisma
const db = require('../config/db');

class Product {

  async all() {
    const [rows] = await db.promise().query('SELECT * FROM products');
    return rows;
  }

  // fungsi create  data
   async create(data) {
    const { name, code, price, size } = data;
    const [result] = await db.promise().query(
      'INSERT INTO products (name, code, price, size) VALUES (?, ?, ?, ?)',
      [name, code, price, size]
    );
    return { id: result.insertId, name, code, price, size };
  }

  // fungsi untuk product yang ready di gudang menggunakan status in-stock
  async productInStock() {
    const sql = `
      SELECT p.*, s.quantity, s.status
      FROM products p
      INNER JOIN stocks s ON p.id = s.product_id
      WHERE s.status = 'in-stock';
    `
    const [rows] =await db.promise().query(sql);

    return rows;
  }

  async withStatus(status) {
    const query = `
      SELECT 
        p.id, p.name, p.code, p.price, p.size, p.created_at, p.updated_at,
        s.quantity, s.status, s.created_at
      FROM products p
      INNER JOIN stocks s ON p.id = s.product_id
      ${status ? 'WHERE s.status = ?' : ''};
    `;
    const [rows] = status
      ? await db.promise().execute(query, [status])
      : await db.promise().execute(query);

    return rows;
  }
}

module.exports = new Product();