const express = require('express')
const dotenv = require("dotenv");
const sequelize = require("./config/database");
const cors = require('cors')
const app = express()
const errorHandler = require("./middlewares/errorHandler")

dotenv.config();

// setting port local and publish
const allowedOrigins = [
  process.env.FRONT_END_URL_LOCAL,
  process.env.FRONT_END_URL_PUBLISH,
];

// handle cors untuk sharing resource port back-end dengan front-end
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
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

// import route untuk login
const logoutRoute  = require("./routes/LogoutRoute.js")

// import route untuk role
const roleRoute = require("./routes/RoleRoute.js")

// import route untuk additionRole
const additionRoleRoute = require("./routes/AdditionRoleRoute.js")

// menggunakan route products
app.use('/api/products', productRoute)

// menggunakan route register
app.use('/api/auth/register', registerRoute)

// menggunakan route untuk login
app.use('/api/auth/login', loginRoute)

// menggunakan route untuk logout
app.use('/api/auth/logout', logoutRoute)

// menggunakan route untuk roles
app.use('/api/roles', roleRoute)

// menggunakan route untuk additionRole
app.use('/api/addition-role', additionRoleRoute)

app.use(errorHandler)
// route untuk api.js

// route untuk authentikasi

// melakukan syncron 
sequelize.sync();

const port =  process.env.PORT;
// menampilkan didalam console
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


