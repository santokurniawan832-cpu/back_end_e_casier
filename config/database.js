require("dotenv").config(); // load .env

// melakukan pemanggilan class Sequalize
const { Sequelize } = require('sequelize');

// melakukan instansiasi class objek dari class Sequalize
const sequelize = new Sequelize(
    process.env.DB_NAME, // nama database
    process.env.DB_USER, // nama user database
    process.env.DB_PASS, // password database
   {
    host:   process.env.DB_HOST,
    dialect: process.env.DB_CONNECTION 
})

// melakukan export  modul objek sequelize
module.exports = sequelize;