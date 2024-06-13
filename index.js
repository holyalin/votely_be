require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

const { APP_PORT } = require('./constants')
const { register, login, token } = require("./controller/authController");
const { createCategory, allCategory } = require("./controller/categoryController");

const app = express();
const cors = require("cors");
const { authenticateToken } = require("./utils");
const { createPolling, pollingDetail, allPolling } = require("./controller/pollingController");

// Middleware untuk parsing JSON
app.use(cors());
app.use(bodyParser.json());

const route = express.Router()
route.post('/register', register)
route.post('/login', login)
route.post('/token', token)
route.post('/category', authenticateToken, createCategory)
route.post('/polling', authenticateToken, createPolling)
route.get('/polling/:polling_id', authenticateToken, pollingDetail)
route.get('/polling', authenticateToken, allPolling)
route.get('/category', authenticateToken, allCategory)

app.use("/api", route);

app.listen(APP_PORT, () => {
  console.log(`Server running on http://localhost:${APP_PORT}`);
});