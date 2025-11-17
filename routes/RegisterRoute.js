// import express
const express = require('express');

// create Router Object
const router = express.Router();


const RegisterController = require("../controllers/RegisterController.js");

const { registerValidation, validate } = require("../middlewares/validation");

// route untuk register

router.post( "/", registerValidation, validate, RegisterController.storeRegister);

module.exports = router;