require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");

const { register, login } = require("./controller/authController");
const { showAllCategory } = require("./controller/categoryController");
const { addOption, showAllOptions } = require("./controller/optionController");
const { polling } = require("./controller/homepageController");
const { createPollingController } = require("./controller/pollingController");
const routes = require("./routes"); // Make sure this file exists and is correctly set up

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Configure session
app.use(
  session({
    secret: "secret_key", // Replace 'secret_key' with a stronger secret
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set to true if using HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    },
  })
);

// Routes
app.post("/register", register);
app.post("/login", login);
app.get("/category", showAllCategory);
app.post("/options", addOption);
app.get("/options", showAllOptions);
app.get("/homepage", polling);
app.post("/polling", createPollingController);
app.use("/api", routes); // Use the defined routes

// Endpoint for logout
app.post("/api/logout", (req, res) => {
  req.session.destroy(); // If using session
  res.json({ message: "Logged out successfully" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
