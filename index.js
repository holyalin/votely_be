require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;
var cors = require("cors");
const { register, login } = require("./controller/authController");
const { showAllCategory } = require("./controller/categoryController");

app.use(cors());
// Middleware untuk parsing JSON
app.use(bodyParser.json());

// Rute untuk registrasi
app.post("/register", register);
app.post("/login", login);

// Rute untuk kategori
app.get("/category", showAllCategory)
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
