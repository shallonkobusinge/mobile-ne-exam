const authController = require("../controllers/auth.controller");
const BASE_URL = process.env.BASE_URL;
module.exports = (app) => {
    app.post(`${BASE_URL}/auth/login`, authController.Login);
    app.post(`${BASE_URL}/auth/nec/register`, authController.Register);
    app.post(`${BASE_URL}/auth/voter/register`, authController.VoterRegister);

}