const Product = require('../repositories/Product');

class ProductController {
  async index(req, res) {
    try {
      const products = await Product.all();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async productWithStatus(req, res) {
    try {
      // mengambil data query status yang dikirim dari URL
       const { status } = req.query;
      
       // mengecek bila tidak ada kiriman status di query string URL
       if(!status) {
        res.status(404).json({
          message: 'query string tidak ada'
        })
       }

      // memamanggil kembail ke model product dengan beserta relasinya
      const products = await Product.withStatus(status)

      if (!products || products.length === 0) {
        return res.status(404).json({
          success: false,
          message: ' No products with status ' + status,
        });
      }

      // 🔥 transform hasil query jadi nested structure
      const groupedProducts = Object.values(
        products.reduce((acc, row) => {
          if (!acc[row.id]) {
            acc[row.id] = {
              id: row.id,
              name: row.name,
              code: row.code,
              price: row.price,
              size: row.size,
              created_at: row.created_at,
              updated_at: row.updated_at,
              stocks: [],
            };
          }
          acc[row.id].stocks.push({
            quantity: row.quantity,
            status: row.status,
          });
          return acc;
        }, {})
      );

      // mengembalikan data beserta dengan http code 200
      res.status(200).json({
        message: 'get data products with status successfully',
        data: groupedProducts
      });

    } catch (error) {
       res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
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
