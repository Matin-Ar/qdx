const express = require("express");
const Category = require("../models/category");
const Tutorial = require("../models/tutorial");
const Course = require("../models/course");
const router = new express.Router();

router.get("/test", async (req, res) => {
  try {
    const category = await Category.find({}, null, { sort: { name: 1 } });
    const tutorial = await Tutorial.find({}, null, { sort: { name: 1 } });

    let test = [];
    category.forEach((cat) => {
      const myObj = {
        category: cat.name,
        tutorials: tutorial.filter((tut) => {
          return tut.cat == cat._id.toString();
        }),
      };
      test.push(myObj);
    });
    res.send(test);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/search/:word", async (req, res) => {
  console.log(req.params.word);
  try {
    const course = await Course.find(
      { title: { $regex: req.params.word } },
      "title",
      {
        sort: { title: 1 },
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
      }
    );
    res.send(course);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
