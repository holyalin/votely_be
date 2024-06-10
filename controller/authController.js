const { AuthService } = require('../service/authService');
const { hashPassword } = require('../utils');
const authService = new AuthService()

// const login = async (req, res) => {
//   console.log(req.body);
//   const { email, password } = req.body;

//   try {
//     // Mencari user berdasarkan emails
//     const user = await prisma.User.findUnique({
//       where: { email },
//     });

//     // Cek jika user tidak ditemukan
//     if (!user) {
//       return res.status(404).json({ success: false, error: "User not found" });
//     }

//     // Membandingkan password yang diberikan dengan yang tersimpan di database
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ success: false, error: "Invalid credentials" });
//     }

//     // Jika email dan password cocok, kirim respons sukses
//     res.status(200).json({ success: true, message: "Login successful", user: { email: user.email, name: user.name } });
//   } catch (error) {
//     // If an error occurs, log it and send an error response
//     console.error("Login error:", error);
//     res.status(500).json({ success: false, error: "Internal Server Error. Details: " + error.message });
//   }
// };

const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) throw new Error('Harap isi semua!')
    if (password.length < 8) throw new Error('Tidak boleh kurang dari 8!')
    const login = await authService.login({ email, password })
    if (!login) throw new Error('Gagal login')
    res.status(200).json({ success: true, data: login });
  } catch (error) {
    console.error("error:", error);
    res.status(400).json({ success: false, error: error?.message });
  }
};

const register = async (req, res) => {
  try {
    let { email, password, full_name } = req.body;
    if (!email || !password || !full_name) throw new Error('Harap isi semua!')
    if (password.length < 8) throw new Error('Tidak boleh kurang dari 8!')
    password = await hashPassword(password)
    await authService.register({ email, password, full_name })
    res.status(201).json({ success: true, data: { email, full_name } });
  } catch (error) {
    console.error("error:", error);
    res.status(400).json({ success: false, error: error?.message });
  }
};

const token = async (req, res) => {
  try {
    let { token } = req.body;
    if (!token) throw new Error('Token tidak ditemukan!')
    const authToken = await authService.token(token)
    res.status(200).json({ success: true, data: authToken });
  } catch (error) {
    console.error("error:", error);
    res.status(400).json({ success: false, error: error?.message });
  }
};

module.exports = { register, login, token };