const express = require("express");
const router = express.Router();
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.send("hey it's working");
});

router.post("/register", async (req, res) => {
  try {
    const { email, password, fullname } = req.body;

    if (!email || !password || !fullname) {
      return res.status(400).send("All fields are required");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await userModel.create({
      email,
      password: hashedPassword,
      fullname,
    });

    res.status(201).send({
      message: "User registered successfully",
      user,
    });

  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;