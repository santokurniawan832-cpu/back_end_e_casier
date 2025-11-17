// import express
const express = require('express');

// create Router Object
const router = express.Router();

const RegisterController = require("../controllers/RegisterController.js");

// route untuk register
router.post('/', (req, res) => RegisterController.storeRegister(req, res));

module.exports = router;