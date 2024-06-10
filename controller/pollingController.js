const { PollingService } = require("../service/pollingService");

const createPollingController = async (req, res) => {
  const { user_id, category, title, name, img } = req.body;
  const pollingService = new PollingService();
  await pollingService.createPolling(user_id, category, title, name, img);
  return res.json({
    message: "polling added successfully",
    data: {},
  });
};

module.exports = { createPollingController };