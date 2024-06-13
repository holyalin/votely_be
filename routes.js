// routes.js

const express = require("express");
const router = express.Router();
const OptionController = require("../controllers/optionController"); // Atur sesuai kebutuhan Anda

const optionController = new OptionController();

router.get("/options", optionController.getOptions);

module.exports = router;
