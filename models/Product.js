// import prisma
const db = require('../config/db');

class Product {
   async getAll() {
    const [rows] = await db.promise().query('SELECT * FROM products');
    return rows;
  }
}

module.exports = new Product();