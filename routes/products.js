var express = require('express');
var router = express.Router();
const addProduct = require('../services/addProduct');


router.get('/products', function(req, res, next) {
    res.send('respond with product resources')
    res.json(addProduct.allProducts());
  });


// Create a new product
router.post('/addProduct', (req, res) => {
    try {
      const { title, description, price, media } = req.body;
      const newProduct = { title, description, price, media };
      const products = addProduct(newProduct);
      res.status(201).json(products);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

// Get a specific product by ID
router.get('/products/:id', (req, res) => {
    const productId = req.params.id;
    const product = addProduct.allProducts().find((p) => p.id === parseInt(productId)); 
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  });
  
 
  // Delete a product
  router.delete('/products/:id', (req, res) => {
    const productId = req.params.id;
    const products = addProduct.allProducts();
    const productIndex = products.findIndex((p) => p.id === parseInt(productId));
  
    if (productIndex !== -1) {
      const deletedProduct = products.splice(productIndex, 1);
      addProduct.saveProducts(); // Update the products data after deletion
      res.json(deletedProduct[0]);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  });


module.exports = router;

