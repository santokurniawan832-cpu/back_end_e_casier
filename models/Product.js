// import prisma
const db = require('../config/db');

class Product {

   async getAll() {
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
}

module.exports = new Product();