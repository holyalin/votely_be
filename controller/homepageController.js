const { HomepageService } = require("../service/homepageService");
const homepageService = new HomepageService();

async function polling(req, res) {
  const resultPolling = await homepageService.showAllOption();
  return res.json(resultPolling);
}
module.exports = { polling };
