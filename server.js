const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;

// Middleware untuk parsing JSON
app.use(bodyParser.json());

// Rute untuk registrasi
app.post("/register", async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // Validasi input
    if (!email || !password || !name) {
      return res.status(400).json({ success: false, error: "All fields are required." });
    }

    // Simpan data ke database (contoh sederhana tanpa database)
    // Anda bisa menambahkan logika penyimpanan database di sini

    // Contoh respons sukses
    const user = { email, name }; // Jangan kirim password kembali
    res.status(201).json({ success: true, user });
  } catch (error) {
    // Tangani error server
    console.error("Error during registration:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
