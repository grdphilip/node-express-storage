const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/*
JWT.IO to check token 
*/


function hashPassword(password) {
  const saltRounds = 10;
  const hash = bcrypt.hashSync(password, saltRounds);
  return hash;
}

const getAll = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const postOne = async (req, res) => {
  const user = new User({
    name: {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    },
    email: req.body.email,
    password: hashPassword(req.body.password),
  });
  console.log(req.body);

  if (req.body.password.length >= 11) {
    try {
      const newUser = await user.save();
      res.status(201).json({
        _id: newUser.id,
        email: newUser.email,
        token: generateToken(newUser._id),
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(400).json({
      message: "Bad request, password must be at least 11 characters",
    });
  }
};

module.exports = {
  getAll,
  postOne,
};
