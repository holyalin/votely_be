const { CategoryService } = require("../service/categoryService");
const categoryService = new CategoryService();

function category(req, res) {
  const name_category = req?.query?.name_category;
  categoryService.category(name_category);
  return res.send();
}

async function showAllCategory(req, res) {
  const categories = await categoryService.showAllCategory();

  return res.json(categories);
}

module.exports = {
  category,
  showAllCategory,
};