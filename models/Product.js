const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {type: String, required: [true, "Please enter the name of the product."]},
    description: {type: String, required: [true, "Please enter a description of the product."]},
    price: {type: Number, required: [true, "Please enter a price for the product."], min: [0.01, "Price must be greater than 0."]},
    category: {type: String, required: [true, "Please enter a category for the product"]},
    inStock: {type: Boolean, default: true},
    tags: {type: [String]},
    createdAt: {type: Date, default: Date.now}
}); 

const Product = new mongoose.model("Product", productSchema);

module.exports = Product;