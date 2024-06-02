const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;
var cors = require("cors");
const { register, login } = require("./controller/authController");

app.use(cors());
// Middleware untuk parsing JSON
app.use(bodyParser.json());

// Rute untuk registrasi
app.post("/register", register);
app.post("/login", login);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
