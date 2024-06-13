const { PollingService } = require('../service/pollingService');
const { CategoryService } = require('../service/categoryService');
const pollingService = new PollingService()
const categoryService = new CategoryService()

const createPolling = async (req, res) => {
  try {
    const { name, image_url, description, deadline_at, category_id } = req.body;
    const { id: owner_id } = req?.user
    if (name.length < 12) throw new Error('Minimal judul polling 12 karakter')
    const category = await categoryService.categoryDetail(category_id)
    if (!category) throw new Error('Kategori tidak ditemukan')
    const createPolling = await pollingService.createPolling({ name, image_url, description, owner_id, deadline_at, category_id })
    res.status(201).json({ success: true, data: createPolling });
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

const pollingDetail = async (req, res) => {
  try {
    const pollingId = req?.params?.polling_id || ""
    if (pollingId?.length < 1) throw new Error('Polling id harus diisi!')
    const polling = await pollingService.pollingDetail({ polling_id: pollingId })
    if (!polling) throw new Error('Polling tidak ditemukan!')
    res.status(200).json({ success: true, data: polling });
  } catch (error) {
    console.error("error:", error);
    res.status(400).json({ success: false, error: error?.message });
  }
}

module.exports = { createPolling, allPolling, pollingDetail };