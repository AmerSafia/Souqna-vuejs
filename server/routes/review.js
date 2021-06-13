//use Router couse use group apis
const router = require("express").Router();
const Review = require("../models/review");
const Product = require("../models/product");
const verifyToken = require("../middlewares/verify-Token");
const upload = require("../middlewares/upload-photo");

// review Post data
router.post(
  "/reviews/:productID",
  verifyToken,
  upload.single("photo"),
  async (req, res) => {
    try {
      let review = new Review();
      review.headline = req.body.headline;
      review.body = req.body.body;
      review.photo = req.file.location;
      review.rating = req.body.rating;
      review.productID = req.params.productID;
      review.user = req.decoded._id;
      const product = await Product.findOne({ _id: review.productID });
      console.log("product.reviews", product);
      product.reviews.push(review._id);

      await product.save();

      const savedReview = await review.save(); //async

      if (savedReview) {
        res.json({
          success: true,
          message: "successfully Added Review",
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
);

//Get All review for that products
router.get("/reviews/:productID", async (req, res) => {
  try {
    //find All review
    let productReview = await Review.find({ productID: req.params.productID })
      .populate("user")
      .exec();
    res.json({
      success: true,
      reviews: productReview,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
module.exports = router;
