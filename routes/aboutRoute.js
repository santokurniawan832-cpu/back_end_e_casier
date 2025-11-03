// import express
const express = require('express');

// create Router Object
const router = express.Router();

const AboutController = require("../controllers/aboutController.js");

router.get('/', (req, res) => AboutController.index(req, res));


router.post('/', (req, res) => AboutController.store(req, res));

module.exports = router;