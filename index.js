const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001; // atau port lain yang tersedia
const mysql = require("mysql");
const { PrismaClient } = require("@prisma/client");
const { login } = require("./controller/authController");
require('dotenv').config()

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/login", login);
// Middleware untuk parsing body JSON
app.use(bodyParser.json());

let items = []; // In-memory data storage

// Create
app.post("/register", async (req, res) => {
  const prisma = new PrismaClient();
  const item = await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
    },
  });
  res.status(201).json(item);
});

// Read all
app.get("/items", (req, res) => {
  res.json(items);
});

// Read one
app.get("/items/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send("Item not found");
  res.json(item);
});

// Update
app.put("/items/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send("Item not found");

  Object.assign(item, req.body);
  res.json(item);
});

// Delete
app.delete("/items/:id", (req, res) => {
  const index = items.findIndex((i) => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send("Item not found");

  const deletedItem = items.splice(index, 1);
  res.json(deletedItem);
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
