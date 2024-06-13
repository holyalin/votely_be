const { PollingService } = require('../service/pollingService');
const pollingService = new PollingService()

const createPolling = async (req, res) => {
  try {
    const { name, image_url, description, deadline_at, category_id } = req.body;
    const { id: owner_id } = req?.user
    if (name.length < 12) throw new Error('Minimal judul polling 12 karakter')
    await pollingService.createPolling({ name, image_url, description, owner_id, deadline_at, category_id })
    res.status(201).json({ success: true, data: {} });
  } catch (error) {
    console.error("error:", error);
    res.status(400).json({ success: false, error: error?.message });
  }
};

const allPolling = async (req, res) => {
  try {
    const polling = await pollingService.allPolling()
    res.status(200).json({ success: true, data: polling });
  } catch (error) {
    console.error("error:", error);
    res.status(400).json({ success: false, error: error?.message });
  }
}

module.exports = { createPolling, allPolling };