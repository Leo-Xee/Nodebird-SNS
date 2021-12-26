const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../database/models/User");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      res.status(403).json({ success: false, message: "이미 존재하는 이메일입니다." });
      return;
    }
    const hashedPassword = await bcrypt.hash(req.body.passwod, 10);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(200).json({ success: true });
  } catch (err) {
    console.err(err);
    next(err);
  }
});

module.exports = router;
