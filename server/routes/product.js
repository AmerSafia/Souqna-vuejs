//use Router couse use group apis
const router = require("express").Router();
const mongooseAlgolia = require("mongoose-algolia");
const Product = require("../models/product");
// const app =express()

const upload = require("../middlewares/upload-photo");

//POST request -create a new product
router.post("/products", upload.single("photo"), async (req, res) => {
  try {
    let product = new Product();
    product.title = req.body.title;
    product.discription = req.body.discription;
    product.photo = req.file.location;
    product.price = req.body.price;
    product.lastPrice = req.body.lastPrice;
    product.owner = req.body.owner;
    product.category = req.body.category;
    product.stockQuantity = req.body.stockQuantity;

    await product.save(); //async
    res.json({
      status: true,
      message: "successfully saved",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

//GET request-get all products
router.get("/products", async (req, res) => {
  try {
    const count = +req.query.count;
    const page = +req.query.page;
    let products = await Product.find()
      .skip(count * (page - 1))
      .limit(count)
      .populate("owner category")
      .populate("reviews", "rating")
      .exec();

    // function (err, wins) {}
    res.json({
      status: true,
      products: products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

//GET request-get single product
router.get("/products/:id", async (req, res) => {
  try {
    let product = await Product.findOne({ _id: req.params.id })
      .populate("owner category")
      .populate("reviews", "rating")
      .exec();
    res.json({
      success: true,
      product: product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

//PUT request -Update a single Product
router.put("/products/:id", upload.single("photo"), async (req, res) => {
  try {
    let product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          price: req.body.price,
          category: req.body.category,
          owner: req.body.owner,
          stockQuantity: req.body.stockQuantity,
          photo: req.file.location,
          discription: req.body.discription,
          lastPrice: req.body.lastPrice,
        },
      },
      //if this id not found in database will add for e a new object
      { upsert: true }
    );
    res.json({
      success: true,
      updateProduct: product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

//DELETE request - delete a single Product
router.delete("/products/:id", async (req, res) => {
  try {
    let deletedProduct = await Product.findOneAndDelete({ _id: req.params.id });

    if (deletedProduct) {
      res.json({
        success: true,
        message: "successfully deleted",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
module.exports = router;
