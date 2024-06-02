const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001; // atau port lain yang tersedia
const mysql = require("mysql");
const { PrismaClient } = require("@prisma/client");
const { login } = require("./controller/authController");
const { category, showAllCategory } = require("./controller/categoryController");
var cors = require('cors')

require('dotenv').config()

app.use(cors())
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
// app.get("/login", login);
app.get("/category", showAllCategory);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
