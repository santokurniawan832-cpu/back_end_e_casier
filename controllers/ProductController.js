const Product = require('../models/Product');

class ProductController {
  async index(req, res) {
    try {
      const products = await Product.getAll();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

}

module.exports = new ProductController();
