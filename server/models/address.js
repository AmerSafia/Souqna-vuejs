const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  country: String,
  fullName: String,
  city: String,
  phoneNumber: String,
  deleverInstruction: String,
  securityCode: String,
  street: String,
});

module.exports = mongoose.model("Address", AddressSchema);
