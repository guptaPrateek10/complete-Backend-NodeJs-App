const express = require('express');
const app = express();
require('dotenv').config();
const dbConnect = require('./config/dbConfig');
const authRoutes = require('./src/routes/auth');
const userRoutes = require('./src/routes/user');
const productRoute = require('./src/routes/product');


//connecting to Mongo db
dbConnect();


app.use(express.json());
const PORT = process.env.PORT || 8000;

//Define authentication routes
app.use('/auth',authRoutes);

//Define User Routes
app.use('/user',userRoutes);

//Define product Roures
app.use('/product',productRoute)

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}` )
})