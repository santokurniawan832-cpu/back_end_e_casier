// import express
const express = require('express');

// create Router Object
const router = express.Router();

const ProductController = require("../controllers/ProductController.js");

router.get('/', (req, res) => ProductController.index(req, res));


router.post('/', (req, res) => ProductController.store(req, res));

// route untuk seluruh product yang ada dalam stok gudang 
router.get('/stocks', (req, res) => ProductController.productWithStatus(req, res))

module.exports = router;