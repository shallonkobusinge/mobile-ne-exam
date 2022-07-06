const jwt = require("jsonwebtoken");

exports.verifiedToken = async (req, res, next) => {
    let token = req.headers["authorization"];
    if (!token) {
        return res.status(401).send({ message: "Invalid token" });
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, data) => {
        if (error) {
            return res.status(403).send({ message: "Invalid token" });
        }
        if (data) {
            req.headers["user"] = data;
            return next();
        }
        return res.sendStatus(500);
    })
}