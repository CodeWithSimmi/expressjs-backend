const express = require("express");
const router = express.Router();
const BeautyProduct = require("../models/products");
const ProductJson = require("../products.json");
const { beautyproductdb } = require("./connection");

// CRUD Routes

// Get all beauty products
router.get("/fetch", async (req, res) => {
  try {
    const connectdb = await beautyproductdb();
    const products = await connectdb.find().toArray();
    console.log(products);
    res.json(products?.[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ ...error });
  }
});

// Add a new beauty product
router.post("/add", async (req, res) => {
  try {
    const connectdb = await beautyproductdb();
    const newProduct = await connectdb.insertOne(req.body);
    console.log(newProduct);
    //  const savedProduct = await newProduct.save();

    // console.log(savedProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ ...error });
  }
});

// router.put("/update", async (req, res) => {
//   try {
//     const connectdb = await beautyproductdb();
//     const updateproduct = await connectdb.updateOne(
//       { productName: "cream" },
//       { $set: { price: "700" } }
//     );
//     res.json(updateproduct);
//   } catch (error) {
//     console.log(error);
//     res.json(...error);
//   }
// });

router.put("/update", async (req, res) => {
  try {
    const connectdb = await beautyproductdb(); 
    
    const { productName, price } = req.body;

   
    if (!productName || !price) {
      return res.status(400).json({ error: "productName and price are required." });
    }

    
    const updateResult = await connectdb.updateOne(
      { productName: productName }, 
      { $set: { price: price } } 
    );

    if (updateResult.matchedCount === 0) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json({
      message: "Product updated successfully.",
      modifiedCount: updateResult.modifiedCount,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Failed to update product", details: error.message });
  }
});






module.exports = router;
