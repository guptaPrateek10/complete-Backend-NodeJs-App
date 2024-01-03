const mongoose = require("mongoose");
const Product = require("../model/productModel");

const getProductDetails = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: "No product found" });
  }
};

const addProduct = async (req, res) => {
  const { title, description, price, img_url } = req.body;
  try {
    const newProduct = new Product({
      title: title,
      description: description,
      price: price,
      img_url: img_url,
    });
    await newProduct.save();
    res.status(201).json({ message: "Product Added" });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const { title, description, price, img_url } = req.body;
  try {
    const result = await Product.updateOne(
      { _id: id },
      {
        $set: {
          title: title,
          description: description,
          price: price,
          img_url: img_url,
        },
      }
    );
    res
      .status(200)
      .json({ message: "Updated records", Updated: result.acknowledged });
  } catch (error) {
    res.status(400).json({ message: "did not update" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletedUser = await Product.findByIdAndDelete(req.params.id);
    if (deletedUser) {
      return res
        .status(200)
        .json({ message: "User deleted successfully", deletedUser });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const Products = await Product.find({});
    res.send(Products);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong." });
  }
};

module.exports = {
  getProductDetails,
  addProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
};
