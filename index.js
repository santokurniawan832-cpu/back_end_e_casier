const express = require('express')
const dotenv = require("dotenv");
const sequelize = require("./config/database");
const cors = require('cors')
const app = express()

dotenv.config();

// handle cors untuk perbedaan port back-end dengan front-end
app.use(cors({
  origin: process.env.FRONT_END_URL,  
  credentials: true
}));

//  JSON parser
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

const port =  process.env.PORT;
// menampilkan didalam console
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
