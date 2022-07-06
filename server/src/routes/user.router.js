const userController = require("../controllers/user.controller");
const { verifiedToken } = require("../utils/token");
const BASE_URL = process.env.BASE_URL;
module.exports = (app) => {
    app.get(`${BASE_URL}/users`, verifiedToken, userController.getAllUsers);
}