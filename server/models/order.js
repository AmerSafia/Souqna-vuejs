const mongoose = require("mongoose");
const deepPopualte = require("mongoose-deep-populate")(mongoose);
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  products: [
    {
      productID: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      price: Number,
      date: {
        type: Date,
        // `Date.now()` returns the current unix timestamp as a number
        default: Date.now,
      },
    },
  ],
  estimatedDelivery: String,
});

OrderSchema.plugin(deepPopualte);

module.exports = mongoose.model("Order", OrderSchema);
