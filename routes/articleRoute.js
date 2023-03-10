const express = require("express");
const router = express.Router();
const Article = require("../models/articleModel");

/* 
Den verkar kalla på funktionen som ligger högst upp
vid konflikting URL.  
*/

// define the home page route
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Search by name
router.get("/search/:query?", async (req, res) => {
  var query = req.params.query;
  const resultName = await Article.findOne({ name: query });
  const resultLio = await Article.findOne({ lioNr: query });
  console.log("Kallad på name")
  try {
    if (resultName) {
      res.send({ resultName });
    } else if (resultLio) {
      res.send({ resultLio });
    } else {
      res.status(404).json({message : "ERR: No matching results"})
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/search/:query?", async (req, res) => {
  var query = req.params.query;
  const article = await Article.find().where('name').equals(query)
  res.send(article)
});

// define the about route
router.post("/", async (req, res) => {
  const article = new Article({
    name: req.body.name,
    compartments: req.body.compartments,
    lioNr: req.body.lioNr,
    price: req.body.price,
    supplier: req.body.supplier,
  });

  console.log(article);

  try {
    const newArticle = await article.save();
    res.status(201).json(newArticle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    article.name = req.body.name;
    article.compartments = req.body.compartments;
    article.lioNr = req.body.lioNr;
    article.price = req.body.price;
    article.supplier = req.body.supplier;

    await article.save();

    res.json(article);
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
