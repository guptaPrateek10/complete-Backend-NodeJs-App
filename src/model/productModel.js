const mongoose = require("mongoose");

const productSchema =new  mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  img_url: {
    type: String,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
