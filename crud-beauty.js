const express = require("express");
const router = express.Router();
const BeautyProduct = require('./models/products'); 
const ProductJson = require('./products.json');
const { beautyproductdb} = require("./connection");



// CRUD Routes

// Get all beauty products
router.get('/fetch', async (req, res) => {
  try {
    const connectdb =await beautyproductdb();

    const products = await connectdb.find().toArray();
    console.log(products);
    res.json(products?.[0]); 
  } catch (error) {
    console.log(error)
    res.status(500).json({...error});
  }
});



// Add a new beauty product
// router.post('/add', async (req, res) => {
//   try {
//     const newProduct = new BeautyProduct(res.body);
//     const savedProduct = await newProduct.save();
//     res.status(201).json(savedProduct);
//   } catch (error) {
//     res.status(400).json({ error: 'Failed to add product' });
//   }
// });


module.exports = router;