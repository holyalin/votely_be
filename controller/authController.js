const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const express = require("express");

const router = express.Router();

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

// Call this function once to update the passwords (only when necessary)
// hashPasswords();

const login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    const user = await prisma.User.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: "Invalid credentials" });
    }

    res.status(200).json({ success: true, message: "Login successful", user: { email: user.email, name: user.name } });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error. Details: " + error.message });
  }
};

const register = async (req, res) => {
  console.log({ req });
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ success: false, error: "All fields are required." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.User.create({
      data: { email, password: hashedPassword, name, created_at: new Date() },
    });

    const user = { email, name };
    res.status(201).json({ success: true, user: { email, name } });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const logout = (req, res) => {
  res.status(200).json({ message: "Logout successful" });
};

module.exports = { login, register, logout };
