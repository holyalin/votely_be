const { AuthService } = require("../service/authService");
const authService = new AuthService()
function login(req, res) {
    const email = req?.query?.email
    const name = req?.query?.name
    const password = req?.query?.password
    authService.login(email, name, password)
    return res.send();
}

function register(req, res) {
    const email = req?.body?.email
    const name = req?.body?.name
    const password = req?.body?.password
    authService.register(email, name, password)
    return res.send();
}

module.exports = {
    login,
    register,
}