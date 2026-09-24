const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {type: String, required: [true, "Please enter the name of the product."]},
    description: {type: String, required: [true, "Please enter a description of the product."]},
    price: {type: Number, required: [true, "Price is required."], min: [0, "Price cannot be negative."]},
    category: {type: String, required},
    inStock: {type: Boolean, default: true},
    tags: {type: [String]},
    createdAt: {type: Date, default: Date.now}
}); 

const Product = new mongoose.model("Product", productSchema);

module.exports = Product;