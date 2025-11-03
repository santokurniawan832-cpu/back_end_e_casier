// import express
const express = require('express');

// create Router Object
const router = express.Router();

const ProductController = require("../controllers/ProductController.js");

router.get('/', (req, res) => ProductController.index(req, res));


router.post('/', (req, res) => ProductController.store(req, res));

module.exports = router;