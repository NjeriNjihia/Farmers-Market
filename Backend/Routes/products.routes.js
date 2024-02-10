const express = require('express')
const {addProduct,
    updateProduct,
    getProducts,
    deleteProduct} = require('../Controllers/product.controller');
const upload = require('../Middlewares/uploads.middleware');
    const router = express.Router();

    router.post('/addproduct',upload.single("image"),addProduct);
    router.put('/update-product/:id', updateProduct);
    router.get('/get-products',getProducts);
    router.delete('/delete/:id',deleteProduct);

module.exports = router