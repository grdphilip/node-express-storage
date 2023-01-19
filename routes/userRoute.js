const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const session = require("express-session");

function hashPassword(password) {
  const saltRounds = 10;
  const hash = bcrypt.hashSync(password, saltRounds);
  return hash;
}

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
router.post("/", async (req, res) => {
  console.log(req.body);

  const user = new User({
    name: {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    },
    email: req.body.email,
    password: hashPassword(req.body.password),
  });

  console.log(typeof(user.password))

  if (req.body.password.length >= 11) {
    try {
      const newUser = await user.save();
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(400).json(
      { message: "Bad request, password must be at least 11 characters" 
    });
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
