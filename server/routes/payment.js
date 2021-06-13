const router = require("express").Router();
const moment = require("moment");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const verfiyToken = require("../middlewares/verify-token");
const Order = require("../models/order");

const SHIPMENT = {
  normal: {
    price: 15.0,
    days: 3,
  },
  fast: {
    price: 30.0,
    days: 1,
  },
};

function shipmentPrice(shipmentOption) {
  // install library moment for time and date
  //$ npm i moment --save
  let estimated = moment()
    .add(shipmentOption.days, "d")
    .format("dddd MMMM Do");

  return {
    estimated,
    price: shipmentOption.price,
  };
}

router.post("/shipment", (req, res) => {
  let shipment;
  if (req.body.shipment === "normal") {
    shipment = shipmentPrice(SHIPMENT.normal);
  } else {
    shipment = shipmentPrice(SHIPMENT.fast);
  }
  res.json({
    success: true,
    shipment: shipment,
  });
});

router.post("/payment", verfiyToken, (req, res) => {
  let totalPrice = Math.round(req.body.totalPrice * 100);
  stripe.customers
    .create({
      email: req.decoded.email,
    })
    .then((customer) => {
      return stripe.customers.createSource(customer.id, {
        source: "tok_visa",
      });
    })
    .then((source) => {
      return stripe.charges.create({
        amount: totalPrice,
        currency: "usd",
        customer: source.customer,
      });
    })
    .then(async (charge) => {
      let order = new Order();
      let cart = req.body.cart;
      cart.map((product) => {
        order.products.push({
          productID: product._id,
          quantity: parseInt(product.quantity),
          price: product.price,
        });
      });
      order.owner = req.decoded._id;
      order.estimatedDelivery = req.body.estimatedDelivery;
      await order.save();
      res.json({
        success: true,
        message: "Successfully made a payment",
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    });
});
module.exports = router;
