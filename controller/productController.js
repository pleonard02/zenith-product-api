const Product = require('../models/Product.js');

async function fetchAllProducts (req, res) {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
}

async function deleteProduct (req, res) {
    
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found."});
        }

        res.json({ message: "Product deleted successfully!", product })
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
}

async function updateProduct (req, res) {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
    
    if (!product) {
        return res.status(404).json({ message: "Product not found."});
    }

    res.status(200).json({ message: "Product updated successfully!", product})
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
}

async function createProduct (req, res) {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({ message: "Product created successfully!", product});
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
}

async function fetchOneProduct (req, res) {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found."});
        }

        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    fetchAllProducts,
    deleteProduct,
    updateProduct,
    createProduct, 
    fetchOneProduct
};