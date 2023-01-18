const express = require("express");
const router = express.Router();


// define the home page route
router.get("/", (req, res) => {
  res.send("Articles home page");
});
// define the about route
router.get("/api/articles/about", (req, res) => {
  res.send("articles");
});

module.exports = router;
