const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const login = async (req, res) => {
  const { email, password } = req.body;
  
  // Implementasi logika login
  res.send("Login endpoint");
};

const register = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      return res.status(400).json({ success: false, error: "All fields are required." });
    }

    const newUser = await prisma.user.create({
      data: { email, password, name },
    });

    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = { login, register };
