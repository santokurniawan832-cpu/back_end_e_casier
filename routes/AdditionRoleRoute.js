// import express
const express = require('express');

// create Router Object
const router = express.Router();

const AdditionRoleController = require("../controllers/AdditionRoleController.js")

const { storeValidation, validate } = require("../validators/additionRoleValidator.js")

// route untuk mengambil seluruh data addition role
router.get('/', AdditionRoleController.index)

// route untuk menambah jabatan baru
router.post( "/", storeValidation, validate, AdditionRoleController.storeData);

// route untuk melakukan update jabatan tambahan
router.put("/:id", storeValidation, validate, AdditionRoleController.updateData)

// route untuk mengambil data addition role berdasarkan id
router.get('/:id', AdditionRoleController.getAdditionRoleBy)

// route untuk menghapus data addition role 
router.delete('/:id', AdditionRoleController.delete)

module.exports = router;