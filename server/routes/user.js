const express = require("express");
const router = express.Router();
const { Admin } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const authValidate = require("../middleware/authMiddleware");
var saltRound = bcrypt.genSaltSync(10);

const createToken = (id) => {
  return jwt.sign({ id }, "Drvl@TestCase", { expiresIn: "3d" });
  // return jwt.sign({ id }, process.env.MY_SECRET_KEY, { expiresIn: "3d" });
};

router.post("/signup", async (req, res) => {
  console.log(req.body);
  if (req.body.password.length === 0) {
    return res.status(400).json({ error: "Password can't be empty" });
  }

  const pwd = bcrypt.hashSync(req.body.password, saltRound);

  try {
    const user = await Admin.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      role: "admin",
      password: pwd,
    });
    console.log(user);
    const token = createToken(user.id);
    return res
      .status(200)
      .json({ user: { email: req.body.email, firstName: user.firstName }, token });
  } catch (error) {
    console.log(error);
    if (error.name === "SequelizeValidationError") {
      const errors = {};
      error.errors.forEach((e) => {
        if (e.message === "Please provide a firstName") {
          errors.firstName = "Please provide a firstName";
        }
        if (e.message === "Please provide email_id") {
          errors.email = "Please provide email_id";
        }
      });
      return res.status(422).json({ errors });
    } else if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ error: "User with this email already exists" });
    } else {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
});


router.post("/signin", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ error: "All fields must be entered" });
  }
  try {
    const user = await Admin.getUser(req.body.email);
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }
    // const match = await bcrypt.compare(req.body.password, user.password);
    const match = await bcrypt.compareSync(req.body.password, user.password);

    if (!match) {
      return res.status(400).json({ error: "Invalid password" });
    }
    const token = createToken(user.id);
    return res
      .status(200)
      .json({ user: { email: req.body.email, firstName: user.firstName }, token });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
});

router.get("/userdata", authValidate, async (req, res) => {
  try {
    const uid = req.user.id;
    const user = await Admin.findByPk(uid);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error occurred while finding user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
