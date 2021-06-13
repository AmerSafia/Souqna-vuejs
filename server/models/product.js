const mongoose = require("mongoose");
const { search } = require("../routes/product");
const mongooseAlgolia = require("mongoose-algolia");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Categroy" },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "Owner" },
    title: String,
    discription: String,
    lastPrice: Number,
    photo: String,
    price: Number,
    stockQuantity: Number,
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    date: {
      type: Date,
      // `Date.now()` returns the current unix timestamp as a number
      default: Date.now,
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

ProductSchema.virtual("averageRating").get(function () {
  if (this.reviews.length > 0) {
    let sum = this.reviews.reduce((total, review) => {
      return total + review.rating;
    }, 0);
    return Math.floor(sum / this.reviews.length);
  }
  return 0;
});
ProductSchema.plugin(mongooseAlgolia, {
  appId: process.env.ALGOLIA_APP_ID,
  apiKey: process.env.ALGOLIA_SECRET,
  indexName: process.env.ALGOLIA_INDEX,
  selector: "title _id photo discription price rating averageRating owner",
  populate: {
    path: "owner reviews",
  },
  debug: true,
});
let Model;
Model = mongoose.model("Product", ProductSchema);
module.exports = Model;

Model.SyncToAlgolia();
Model.SetAlgoliaSettings({
  searchableAttributes: ["title"],
});

module.exports = Model;
