const express = require('express');
const { authenticate } = require('../middleware/auth');
const {getProductDetails,addProduct,getAllProduct, updateProduct, deleteProduct} = require('../controller/product');
const router = express.Router();

router.get('/prod/:id',authenticate,getProductDetails);
router.post('/addProduct',authenticate,addProduct)
router.get('/allProducts',authenticate,getAllProduct)
router.put('/update/:id',authenticate,updateProduct)
router.delete('/delete/:id',authenticate,deleteProduct)

module.exports=router;