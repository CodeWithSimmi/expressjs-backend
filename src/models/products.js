const mongoose = require('mongoose');

// Define the schema for beauty products
const beautyProductSchema = new mongoose.Schema({
    productName: { type: String },
    brandName: { type: String},
    price: { type: Number },
    category: { type: String, required: true },
    description: { type: String },
    stock: { type: Number, default: 0 },
  });

  // Create a model from the schema
// const BeautyProduct = mongoose.model('BeautyProduct', beautyProductSchema);



module.exports = mongoose.model('Product', beautyProductSchema);

