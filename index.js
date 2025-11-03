const express = require('express')
const dotenv = require("dotenv");

const app = express()
const port = 8080;

dotenv.config();
// middleware
app.use(express.json());

// doing import aboutRoute.js
const aboutRoute = require('./routes/aboutRoute.js')
const productRoute = require('./routes/ProductRoute.js')


// using about route
app.use('/about', aboutRoute)

// using product route
app.use('/products', productRoute)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
