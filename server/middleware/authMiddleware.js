const jwt = require("jsonwebtoken");
require("dotenv").config();
const { Admin } = require("../models");

const authValidate = (req, res, next) => {
    const token = req.headers["authorization"];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token.split(" ")[1], "Drvl@TestCase", async (err, user) => {
        // jwt.verify(token.split(" ")[1], process.env.MY_SECRET_KEY, async (err, user) => {
        if (err) return res.sendStatus(403);
        const u = await Admin.findByPk(user.id);
        req.user = u;
        next();
    });
};

module.exports = authValidate;
