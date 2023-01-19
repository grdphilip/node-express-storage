const express = require("express");
const router = express.Router();
const Article = require("../models/articleModel");

// define the home page route
router.get("/", async (req, res) => {
  const article = new Article({
    name: req.body.name,
    lioNr: req.body.lioNr,
    price: req.body.price,
    supplier: req.body.supplier,
  });

  article.sayHi()

  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// define the about route
router.post("/", async (req, res) => {
  const article = new Article({
    name: req.body.name,
    lioNr: req.body.lioNr,
    price: req.body.price,
    supplier: req.body.supplier,
  });

  try {
    const newArticle = await article.save();
    res.status(201).json(newArticle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const article = await Article.deleteOne(req.params.id);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/", async (req, res) => {
  try {
    const articles = await Article.deleteMany();
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
