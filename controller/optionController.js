const { OptionService } = require("../service/optionService");
const optionService = new OptionService();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const addOption = async (req, res) => {
  const { categoryId, name, img, name_category } = req.body;

  try {
    const option = await optionService.addOption(categoryId, name, img, name_category);
    res.json({
      message: "Option added successfully",
      data: option,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add option",
      error: error.message,
    });
  }
};

const showAllOptions = async (req, res) => {
  try {
    const options = await optionService.showAllOptions();
    res.json(options);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch options",
      error: error.message,
    });
  }
};

module.exports = { addOption, showAllOptions };
