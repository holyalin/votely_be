
const { PollingService } = require('../service/pollingService');
const { OptionService } = require('../service/optionService');
const pollingService = new PollingService()
const optionService = new OptionService()

const createOption = async (req, res) => {
  try {
    const { name, image_url } = req.body;
    const { id: owner_id } = req?.user
    let { polling_id } = req?.params
    polling_id = parseInt(polling_id)
    if (name.length < 1) throw new Error('Minimal judul option 1 karakter')
    const polling = await pollingService.pollingDetail(polling_id)
    if (!polling) throw new Error('Polling tidak ditemukan')
    const createOption = await optionService.createOption({ image_url, name, owner_id, polling_id })
    res.status(201).json({ success: true, data: createOption });
  } catch (error) {
    console.error("error:", error);
    res.status(400).json({ success: false, error: error?.message });
  }
};

module.exports = { createOption };
