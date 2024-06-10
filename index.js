require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

const { APP_PORT } = require('./constants')
const { register, login, token } = require("./controller/authController");
const { createCategory } = require("./controller/categoryController");

const app = express();
const cors = require("cors");
const { authenticateToken } = require("./utils");

// Middleware untuk parsing JSON
app.use(cors());
app.use(bodyParser.json());

const route = express.Router()
route.post('/register', register)
route.post('/login', login)
route.post('/token', token)
route.post('/category', authenticateToken, createCategory)

app.use("/api", route);

app.listen(APP_PORT, () => {
  console.log(`Server running on http://localhost:${APP_PORT}`);
});