// import express
const express = require('express');

// create Router Object
const router = express.Router();

const LoginController = require("../controllers/auth/LoginController");

// route untuk register
router.post('/', LoginController.storeLogin);

module.exports = router;