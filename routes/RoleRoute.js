// import express
const express = require('express');

// create Router Object
const router = express.Router();

const RoleController = require("../controllers/RoleController.js");

const { storeValidation, validate } = require("../validators/roleValidator.js");

// route untuk menambah jabatan tambahan baru
router.post( "/", storeValidation, validate, RoleController.storeData);

// route untuk mengambil seluruh data jabatan 
router.get('/', RoleController.index)

module.exports = router;