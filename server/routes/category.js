//use Router couse use group apis
const router = require("express").Router();
const Category = require("../models/category");

//Post request
router.post("/categories", async (req, res) => {
  try {
    const category = new Category();
    category.type = req.body.type;
    await category.save(); //async

    res.json({
      success: true,
      message: "successfully saved",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

//get request
router.get("/categories", async (req, res) => {
  try {
    let categories = await Category.find();
    res.json({
      status: true,
      categories: categories,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
