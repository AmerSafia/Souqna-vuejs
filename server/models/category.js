const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategroySchema = new Schema({
  type: { type: String, unique: true, required: true },
});

module.exports = mongoose.model("Categroy", CategroySchema);
