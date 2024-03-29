const express = require("express");
const app = express();
const dbConnect = require("../config/dbConfig");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const productRoute = require("./routes/product");

//connecting to Mongo db
dbConnect();

app.use(express.json());

//Define authentication routes
app.use("/auth", authRoutes);

//Define User Routes
app.use("/user", userRoutes);

//Define product Roures
app.use("/product", productRoute);

module.exports = app;
