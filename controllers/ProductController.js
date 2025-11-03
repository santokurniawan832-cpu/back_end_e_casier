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

  async store(req, res) {
    try {
      const { name, code, price, size } = req.body;
      if (!name || !code || !price || !size) {
        return res.status(400).json({ message: 'All fields (name, code, price, size) are required' });
      }

      const newProduct = await Product.create({ name, code, price, size });
      res.status(201).json(newProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }


}

module.exports = new ProductController();
