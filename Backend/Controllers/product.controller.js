const dbHandler = require('../Database/dbHandler')
const upload = require('../Middlewares/uploads.middleware');
const { uploadToCloudinary } = require('../Services/cloudinary');
//add product
const addProduct = async (req, res) => {
    try {
        const [product_name, product_description, product_price,
            product_rating] = req.body;
        const [product_image] = req.file.path;
        //null checking
        if (!product_name || !product_description
            || !product_price || product_rating) {
            return res.status(400).send("All fields are required!!!");
        }
        //upload product image to cloudinary
        const data  = await uploadToCloudinary(product_image, "test-one")
        //save image url and publicID to the database
        const imageUrl = data.url;
        // create a new product object
        const productData = {
            product_name,
            product_description,
            product_price: parseFloat(product_price),
            product_image: imageUrl,//cloudinary  url will be stored here
            product_rating: parseInt(product_rating),
        }
        //insert the product into the database
        await dbHandler.insertProduct(productData);
        res.status(201).json({ message: "Product added successfully!" });

    } catch (error) {
        console.log(`Error in adding a new product : ${error}`);
        res.status(500).json({ error: 'Internal Server Error' })
    }

}
//update product

const updateProduct = async (req, res) => {
    try {
        const product_id = (req.params.id)
        const [update_product_name, update_product_description,
            update_product_price] = req.body;

        const productToUpdate = await dbHandler.getProductByID(product_id);
        if (!productToUpdate) {
            return res.status(404).send("Product not found")
        }

        //updated product data
        const updatedProductData = {
            product_name: update_product_name,
            product_description: update_product_description,
            product_price: update_product_price
        }

        await dbHandler.updateProduct(product_id, updatedProductData)

        res.status(200).json({ message: 'product updated successfully' })
    } catch (error) {
        console.error("error in  updating product", error);
        res.status(500).json({ error: 'Server Error' });
    }

}
//get products
const getProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; //default to page 1 if not specified
        const pageSize = parseInt(req.query.pageSize) || 10;
        const offset = (page -1) * pageSize;
        const products = await dbHandler.getProducts(offset, pageSize); 

        const totalCount = await dbHandler.getProductCount();

        res.status(200).json({
            products,
            currentPage: page,
            pageSize,
            totalPages: Math.ceil(totalCount / pageSize)
        });
    } catch (error) {
        console.error("Error getting products from the database", error);
        res.status(500).json({error:"internal server error"})
    }
}

//delete product
const deleteProduct = async (req,res)=>{
    const {product_id}= req.params.id;
    try {
        //check if the product to delete exists
        const existProduct = await dbHandler.getProductByID(product_id);
        if(!existProduct){
            return res.status(404).json({message:'No Product Found with this ID'});
        }

        //delete the product from the database if it exists
        await dbHandler.deleteProduct(product_id);
        
        res.status(200).json({message:'Deleted Successfully'})
    } catch (error) {
        console.error("Error in deleting product:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    addProduct,
    updateProduct,
    getProducts,
    deleteProduct
}