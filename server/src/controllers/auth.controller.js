const { User, validateUser, generateToken, validateLogin } = require("../models/user.model");
const { SUCCESS_RESPONSE, ERROR_RESPONSE, CREATED_RESPONSE } = require("../utils/APIResponse");
const bcrypt = require("bcrypt");


//login and generate token,check if the user exists and is only an admin

exports.Login = async (req, res) => {

    const { error } = validateLogin(req.body);
    if (error) {
        return res.status(400).send(ERROR_RESPONSE(null, error, 400));
    }

    let sameUser = await User.findOne({
        $or: [
            { nationalId: req.body.iDOrPhoneOrEmail },
            {
                phone: req.body.iDOrPhoneOrEmail
            },
            {
                email: req.body.iDOrPhoneOrEmail
            }
        ]

    })
    if (!sameUser) {
        return res.status(404).send(ERROR_RESPONSE(null, "User not found", 404));
    }
    //check if the user is an admin
    // if (sameUser.isAdmin !== true) {
    //     return res.status(401).send(ERROR_RESPONSE(null, "User is not NEC", 401));
    // }

    const isMatch = await bcrypt.compare(req.body.password, sameUser.password);

    if (!isMatch) {
        return res.status(401).send(ERROR_RESPONSE(null, "Invalid password", 401));
    }
    const token = await generateToken(sameUser);
    return res.status(200).send(CREATED_RESPONSE(token, sameUser, "Logged in successfully", 200));

}

exports.VoterRegister = async (req, res) => {
    console.log("body ", req.body);
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(ERROR_RESPONSE(error.details[0].message, 400));
    const existingUser = await User.findOne({
        $or: [
            { nationalId: req.body.nationalId },
            {
                phone: req.body.phone

            },
            {
                email: req.body.email
            }
        ]
    }
    );
    if (existingUser) return res.status(400).send(ERROR_RESPONSE(`User with national id of ${req.body.nationalId} or phone number of ${req.body.phone} or email of ${req.body.email} already exists`, 400));
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        phone: req.body.phone,
        nationalId: req.body.nationalId,
        address: req.body.address,
        password: newPassword,
        email: req.body.email,
        isAdmin: false,
    });
    await newUser.save();
    return res.status(201).send(CREATED_RESPONSE(newUser, "Voter created successfully", 201));
}
exports.Register = async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(ERROR_RESPONSE(error.details[0].message, 400));
    const existingUser = await User.findOne({
        $or: [
            { nationalId: req.body.nationalId },
            {
                phone: req.body.phone

            },
            {
                email: req.body.email
            }
        ]
    }
    );
    if (existingUser) return res.status(400).send(ERROR_RESPONSE(`User with national id of ${req.body.nationalId} or phone number of ${req.body.phone} or email of ${req.body.email} already exists`, 400));
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        phone: req.body.phone,
        nationalId: req.body.nationalId,
        address: req.body.address,
        password: newPassword,
        email: req.body.email,
        isAdmin: true,
    });
    await newUser.save();
    return res.status(201).send(CREATED_RESPONSE(newUser, "NEC User created successfully", 201));

}