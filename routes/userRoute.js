const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const session = require('express-session');


function hashPassword(password) {
  const saltRounds = 10;
  const hash = bcrypt.hashSync(password, saltRounds);
    return hash;
};


//Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Get one user
router.get("/:id", async (req, res) => {
 
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Get one user
router.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword(req.body.password),
  });

  console.log(req.body.name)

  try {
    const newUser = await user.save();
    res.status(201).json(newUser)
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Get one user
router.put("/:id", (req, res) => {
  res.send("About users");
});

//Get one user
router.delete("/:id", (req, res) => {
  res.send("Delete users");
});

module.exports = router;
