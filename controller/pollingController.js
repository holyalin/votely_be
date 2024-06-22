const { PollingService } = require("../service/pollingService");
const { CategoryService } = require("../service/categoryService");
const { OptionService } = require("../service/optionService");
const pollingService = new PollingService();
const categoryService = new CategoryService();
const optionService = new OptionService();

const createPolling = async (req, res) => {
  try {
    const { name, image_url, description, deadline_at, category_id } = req.body;
    const { id: owner_id } = req?.user;
    if (name.length < 12) throw new Error("Minimal judul polling 12 karakter");
    const createPolling = await pollingService.createPolling({ name, image_url, description, owner_id, deadline_at, category_id: parseInt(category_id) });
    
    res.status(201).json({ success: true, data: createPolling });
  } catch (error) {
    console.error("error:", error);
    res.status(400).json({ success: false, error: error?.message });
  }
};

const poll = async (req, res) => {
  try {
    const { id: owner_id } = req?.user;
    const { polling_id, option_id } = req?.params;
    const polling = await pollingService.pollingDetail({ polling_id: Number(polling_id) });
    if (!polling) throw new Error(`${polling_id} tidak ditemukan`);
    const option = await optionService.optionDetail({ option_id: Number(option_id), polling_id: Number(polling_id) });
    if (!option) throw new Error(`${option_id} tidak ditemukan`);
    const pollHistory = await pollingService.checkPoll({ option_id: Number(option_id), owner_id, polling_id: Number(polling_id) });
    if (pollHistory) throw new Error(`Anda sudah melakukan polling`);
    const poll = await pollingService.poll({ option_id: Number(option_id), owner_id, polling_id: Number(polling_id) });
    res.status(201).json({ success: true, data: poll });
  } catch (error) {
    console.error("error:", error);
    res.status(400).json({ success: false, error: error?.message });
  }
};

const allPolling = async (req, res) => {
  try {
    const polling = await pollingService.allPolling();
    res.status(200).json({ success: true, data: polling });
  } catch (error) {
    console.error("error:", error);
    res.status(400).json({ success: false, error: error?.message });
  }
};

const pollingDetail = async (req, res) => {
  try {
    const pollingId = Number(req?.params?.polling_id) || "";
    if (pollingId?.length < 1) throw new Error("Polling id harus diisi!");
    const polling = await pollingService.pollingDetail({ polling_id: pollingId });
    if (!polling) throw new Error("Polling tidak ditemukan!");
    const options = await optionService.optionByPolling({ polling_id: pollingId });
    const history = await pollingService.pollHistory({ polling_id: pollingId });
    res.status(200).json({ success: true, data: { ...polling, options, history } });
  } catch (error) {
    console.error("error:", error);
    res.status(400).json({ success: false, error: error?.message });
  }
};

module.exports = { createPolling, allPolling, pollingDetail, poll };
