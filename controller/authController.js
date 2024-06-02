const { AuthService } = require("../service/authService");
const authService = new AuthService()
function login(req, res) {
    const email = req?.query?.email
    const name = req?.query?.name
    authService.login(email, name)
    return res.send();
}

module.exports = {
    login
}