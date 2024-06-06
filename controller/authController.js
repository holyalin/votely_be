const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

const hashPasswords = async () => {
  const users = await prisma.User.findMany();
  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await prisma.User.update({
      where: { email: user.email },
      data: { password: hashedPassword },
    });
  }
  console.log("Passwords have been hashed");
};

// Call this function once to update the passwords
hashPasswords();

const login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    // Mencari user berdasarkan emails
    const user = await prisma.User.findUnique({
      where: { email },
    });

    // Cek jika user tidak ditemukan
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Membandingkan password yang diberikan dengan yang tersimpan di database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: "Invalid credentials" });
    }

    // Jika email dan password cocok, kirim respons sukses
    res.status(200).json({ success: true, message: "Login successful", user: { email: user.email, name: user.name } });
  } catch (error) {
    // If an error occurs, log it and send an error response
    console.error("Login error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error. Details: " + error.message });
  }
};

const register = async (req, res) => {
  console.log({ req });
  try {
    const { email, password, name } = req.body;

    // Validasi input
    if (!email || !password || !name) {
      return res.status(400).json({ success: false, error: "All fields are required." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan data ke database (contoh sederhana tanpa database)
    await prisma.User.create({
      data: { email, password: hashedPassword, name, created_at: new Date() },
    });
    // Anda bisa menambahkan logika penyimpanan database di sini

    // Contoh respons sukses
    const user = { email, name }; // Jangan kirim password kembali
    res.status(201).json({ success: true, user: { email, name } });
  } catch (error) {
    // Tangani error server
    console.error("Error during registration:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }

  const register = (req, res) => {
    // Registration logic here
    res.json({ message: "User registered successfully" });
  };

  const login = (req, res) => {
    // Login logic here
    res.json({ message: "User logged in successfully" });
  };

  module.exports = { register, login };
};
//   const { email, password, name } = req.body;

//   try {
//     if (!email || !password || !name) {
//       return res.status(400).json({ success: false, error: "All fields are required." });
//     }

//     const newUser = await prisma.user.create({
//       data: { email, password, name },
//     });

//     res.status(201).json({ success: true, user: newUser });
//   } catch (error) {
//     console.error("Error during registration:", error);
//     res.status(500).json({ success: false, error: "Internal Server Error" });
//   }
// };

module.exports = { login, register };
