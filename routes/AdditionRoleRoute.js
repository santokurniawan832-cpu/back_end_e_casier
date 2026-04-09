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
router.put("/:id/update", storeValidation, validate, AdditionRoleController.updateData)

// route untuk mengambil seluruh data addition_role berdasarkan role_id
router.get('/:id/list', AdditionRoleController.getAdditionRoleBy)

// route untuk mengambil 1 data addition role berdasarkan additionrole_id
router.get('/:id/show', AdditionRoleController.getAdditionRole)

// route untuk menghapus data addition role 
router.delete('/:id', AdditionRoleController.delete)

module.exports = router;