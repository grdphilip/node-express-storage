const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const session = require("express-session");
const bcrypt = require("bcrypt");
const { getAll, postOne } = require("../controllers/userController");

//Get all users
router.route("/").get(getAll).post(postOne);


//Login
router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  console.log(req.body);

  const user = await User.findOne({ email });

  if (user && bcrypt.compare(password, user.password)) {
    res.json({
      _id: user.id,
      email: user.email,
      password: user.password,
    });
  } else {
    res.status(400).json({ message: "Invalid credentials" });
  }
});

//Get one user
router.get("/:id", async (req, res, next) => {
  try {
    /* Await is not redundant the interpreter is being a bitch */
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  next();
});

//Get one user

//Get one user
router.put("/:id", (req, res) => {
  res.send("About users");
});

//Get one user
router.delete("/:id", (req, res) => {
  res.send("Delete users");
});

module.exports = router;
