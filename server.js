require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3001;
const { register, login } = require("./controller/authController");
const authRoutes = require("./routes/auth");
const { showAllCategory } = require("./controller/categoryController");
const { upload, handleOptionUpload } = require("./controller/uploadController");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads")); // Serve uploaded files

app.use("/api/auth", authRoutes);

// Rute untuk registrasi
app.post("/register", register);
app.post("/login", login);

// Rute untuk kategori
app.get("/category", showAllCategory);

// Rute untuk menambahkan option
app.post("/options", upload.single("image"), handleOptionUpload);
app.post("/polling", upload.single("image"), handleOptionUpload);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
