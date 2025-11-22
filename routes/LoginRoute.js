// import express
const express = require('express');

// create Router Object
const router = express.Router();

const LoginController = require("../controllers/auth/LoginController");

// route untuk register
router.post('/', (req, res) => LoginController.storeLogin(req, res));

module.exports = router;