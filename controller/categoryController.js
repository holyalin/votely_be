const { AuthService } = require('../service/authService');
const authService = new AuthService()

const createCategory = async (req, res) => {
  try {
    console.log({ req })
    res.status(200)
    // let { category } = req.body;
    // if (!email || !password) throw new Error('Harap isi semua!')
    // if (password.length < 8) throw new Error('Tidak boleh kurang dari 8!')
    // const login = await authService.login({ email, password })
    // if (!login) throw new Error('Gagal login')
    // res.status(200).json({ success: true, data: login });
  } catch (error) {
    console.error("error:", error);
    res.status(400).json({ success: false, error: error?.message });
  }
};

module.exports = { createCategory };