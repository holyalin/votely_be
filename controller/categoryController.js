const { CategoryService } = require('../service/categoryService');
const categoryService = new CategoryService()

const createCategory = async (req, res) => {
  try {
    const { category_name } = req.body;
    const { id } = req?.user
    if (category_name.length < 4) throw new Error('Minimal kategori 4 karakter')
    await categoryService.createCategory({ name: category_name, owner_id: id })
    res.status(201).json({ success: true, data: {} });
  } catch (error) {
    console.error("error:", error);
    res.status(400).json({ success: false, error: error?.message });
  }
};

const allCategory = async (req, res) => {
  try {
    const category = await categoryService.allCategory()
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    console.error("error:", error);
    res.status(400).json({ success: false, error: error?.message });
  }
}

module.exports = { createCategory, allCategory };