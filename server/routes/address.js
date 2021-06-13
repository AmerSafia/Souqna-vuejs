const router = require("express").Router();
const Address = require("../models/address");
const User = require("../models/user");
const verifyToken = require("../middlewares/verify-token");
const axios = require("axios");
const { verify } = require("jsonwebtoken");

/*Post API Create Address  */
router.post("/addresses", verifyToken, async (req, res) => {
  try {
    let address = new Address();
    address.user = req.decoded._id;
    address.country = req.body.country;
    address.street = req.body.street;
    address.fullName = req.body.fullName;
    address.city = req.body.city;
    address.phoneNumber = req.body.phoneNumber;
    address.deleverInstruction = req.body.deleverInstruction;
    address.securityCode = req.body.securityCode;

    await address.save(); //async
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

//GET request-get all address
router.get("/addresses", verifyToken, async (req, res) => {
  try {
    let addresses = await Address.find({ user: req.decoded._id }).exec();
    res.json({
      status: true,
      addresses: addresses,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

/* Get address by id */
router.get("/addresses/:id", verifyToken, async (req, res) => {
  try {
    let address = await Address.findOne({ _id: req.params.id }).exec();
    res.json({
      status: true,
      address: address,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

/*GET Countries  */
router.get("/countries", async (req, res) => {
  try {
    let response = await axios.get("https://restcountries.eu/rest/v2/all");

    res.json(response.data);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

/*Update Address  */
router.put("/addresses/:id", verifyToken, async (req, res) => {
  try {
    let foundAddress = await Address.findOne({
      user: req.decoded._id,
      _id: req.params.id,
    });
    if (req.body.country) foundAddress.country = req.body.country;
    if (req.body.street) foundAddress.street = req.body.street;
    if (req.body.fullName) foundAddress.fullName = req.body.fullName;
    if (req.body.city) foundAddress.city = req.body.city;
    if (req.body.phoneNumber) foundAddress.phoneNumber = req.body.phoneNumber;
    if (req.body.deleverInstruction)
      foundAddress.deleverInstruction = req.body.deleverInstruction;
    if (req.body.securityCode)
      foundAddress.securityCode = req.body.securityCode;

    await foundAddress.save();
    res.json({
      success: true,
      message: "successfully Updated",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

/* delete address  */
router.delete("/addresses/:id", verifyToken, async (req, res) => {
  try {
    let deletedAddress = await Address.remove({
      user: req.decoded._id,
      _id: req.params.id,
    });

    if (deletedAddress) {
      res.json({
        success: true,
        message: "successfully deleted Address",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

/* set address As Default  */
router.put("/addresses/set/default", verifyToken, async (req, res) => {
  try {
    const UpdateAddressUser = await User.findOneAndUpdate(
      { _id: req.decoded._id },
      { $set: { address: req.body.id } }
    );
    if (UpdateAddressUser) {
      res.json({
        success: true,
        message: "successfully set Address as default",
      });
    }
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
