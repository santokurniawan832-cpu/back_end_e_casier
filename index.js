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

// doing import UserRoute
const registerRoute  = require("./routes/RegisterRoute.js")

// doing import UserRoute
const loginRoute  = require("./routes/LoginRoute.js")

// using products route
app.use('/products', productRoute)

app.use('/register', registerRoute)

app.use('/login', loginRoute)

sequelize.sync();
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
