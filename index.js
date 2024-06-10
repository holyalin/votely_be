require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;
var cors = require("cors");
const { register, login } = require("./controller/authController");
const { showAllCategory } = require("./controller/categoryController");
const { addOption, showAllOptions } = require("./controller/optionController");
const { polling } = require("./controller/homepageController");
const { createPollingController } = require("./controller/pollingController");

app.use(cors());
// Middleware untuk parsing JSON
app.use(bodyParser.json());

// Rute untuk registrasi
app.post("/register", register);
app.post("/login", login);

// Rute untuk kategori
app.get("/category", showAllCategory);

// Routes for options
app.post("/options", addOption);
app.get("/options", showAllOptions);

// rute untu homepage
app.get("/homepage", polling);

//rute untuk polling
app.post("/polling", createPollingController);

// // Middleware for 404 error handling
// app.use((req, res, next) => {
//   res.status(404).json({ message: "Route not found" });
// });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});