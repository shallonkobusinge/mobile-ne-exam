const { User, validateUser, generateToken, validateLogin } = require("../models/user.model");
const { SUCCESS_RESPONSE, ERROR_RESPONSE, CREATED_RESPONSE } = require("../utils/APIResponse");

//get all users paginated
exports.getAllUsers = async (req, res) => {
    const users = await User.find({});
    return res.status(200).send(SUCCESS_RESPONSE(users, "Users fetched successfully", 200));
}