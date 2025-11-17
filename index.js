const express = require('express')
const dotenv = require("dotenv");
const sequelize = require("./config/database");

const app = express()
const port = 8080;

dotenv.config();
// middleware
app.use(express.json());

// doing import ProductRoute.js
const productRoute = require('./routes/ProductRoute.js')

// import route untuk register
const registerRoute  = require("./routes/RegisterRoute.js")

// import route untuk login
const loginRoute  = require("./routes/LoginRoute.js")

// menggunakan route products
app.use('/products', productRoute)

// menggunakan route register
app.use('/register', registerRoute)

// menggunakan route untuk login
app.use('/login', loginRoute)

// melakukan syncron 
sequelize.sync();

// menampilkan didalam console
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
