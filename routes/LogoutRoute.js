// memanggil class AuthMiddleware untuk digunakan fungsi authenticate
const AuthMiddleware = require("../middlewares/AuthMiddleware.js")

// import express
const express = require('express');

// create Router Object
const router = express.Router();

const LogoutController = require("../controllers/LogoutController.js");

// route untuk register
router.post('/', AuthMiddleware.authenticate, (req, res) => LogoutController.authLogout(req, res));

module.exports = router;