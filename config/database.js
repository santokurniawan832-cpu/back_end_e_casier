require("dotenv").config(); // load .env

// melakukan pemanggilan class Sequalize
const { Sequelize } = require('sequelize');

// melakukan instansiasi class objek dari class Sequalize
const sequelize = new Sequelize(
    process.env.DB_NAME, // pengisian nilai nama database
    process.env.DB_USER, // pengisian nilai nama user database
    process.env.DB_PASS, // pengisian nilai password database
   {
    host:   process.env.DB_HOST, // pengisian nilai host database
    dialect: process.env.DB_CONNECTION, // pengisian nilai jenis koneksi database
    logging: false // mematikan loggin diconsole agar 
})

// melakukan export  modul objek sequelize
module.exports = sequelize;