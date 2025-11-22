// import express
const express = require('express');

// create Router Object
const router = express.Router();

const RoleController = require("../controllers/RoleController.js");

const { storeValidation, validate } = require("../validators/roleValidator.js");

// router.post( "/", storeValidation, validate, RegisterController.storeRegister);
// route untuk menambah jabatan baru
router.post( "/", storeValidation, validate, RoleController.storeData);

module.exports = router;