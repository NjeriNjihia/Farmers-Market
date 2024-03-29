const mysql = require('mysql2')
const dbConfig = require('../Config/db.Config')
const queries = require('../Queries/queries')
const pool = mysql.createPool(dbConfig); /* connection pool is technique 
used to efficiently manage and reuse database connections improving performance */

const executeQuery = (query, values=[])=>{
    return new Promise((resolve, reject) =>{
        pool.query(query, values,(err, result)=>{
            if(err){
                reject(err)
            }else{
                resolve(result)
            }
        })
    })  
}

// create a databse if  it doesn't exist already
const createDatabaseIfNotExists = async () =>{
    try {
        const result = await executeQuery(queries.showDatabases);              
        const DatabaseExists = result.length > 0;
        if(!DatabaseExists){
            await executeQuery(queries.createDatabase);
            console.log('database created successfully')
        }else{
            console.log('Database already exists');
        }
    } catch (error) {        
            throw error;        
    }
}
//create tables if they don't exist

const createTableIfNotExists = async ()=>{
    try {
        const result = await executeQuery(queries.showUsersTableQuery)    
        const result2 = await executeQuery(queries.showProductsTable)  
        //if users table does not exist in the selected database then add columns to Users Table
        const userTableExists = result.length > 0;
        const customerTableExists = result2.length > 0;
        
        if(!userTableExists){
            await executeQuery(queries.createUserTableQuery);
            console.log(' user table was created successfully')
        }else if(!customerTableExists){
            await executeQuery(queries.createProductsTable);
            console.log(' customer table was created successfully')
        }
        else{
        console.log('tables already exists')
        }
    } catch (error) {
        throw error;
    }
}

//insert a user 
const insertUser = async (userData) =>{
    const {name, email, password, phone,role} = userData;
    try {
        await executeQuery(queries.insertUsersQuery, [name, email,password,phone,role]);
        console.log('user added successfully')
    } catch (error) {
        throw error;
    }
}
//select a user by email
const selectUserByEmail = async (email) =>{
    try {
       const result = await executeQuery(queries.selectUserByEmail, [email]);           
        return result;
    } catch (error) {
        throw error;  
    }
}
//select a user by role
const selectUserByRole = async (role) =>{
    try {
       const result = await executeQuery(queries.selectUserByRole, [role]);           
        return result;
    } catch (error) {
        throw error;
    }
}
//select all users
const selectUsers = async () =>{
    try {
        const result = await executeQuery(queries.selectAllUsers);
        if(result.length > 0){
            return result;
        }else{
            console.log('no users in the table')
        }
    } catch (error) {
        throw error;
    }
}
//insert a new product to the database
const insertProduct = async (productData) =>{
    const [product_name, product_description, 
        product_price, product_rating, product_image] = productData;
        try {
            await executeQuery(queries.insertProduct, [product_name,product_description,
             product_price, product_rating, product_image])
             console.log("product added successfully");
            
        } catch (error) {
            throw error;
        }
}

// update a product
const updateProduct = async (product_id ,newProductData)=>{
    const [product_name, product_description, 
        product_price, product_rating, product_image] = newProductData;

        try {
            await executeQuery(queries.updateProduct,[product_name,product_description,
             product_price, product_rating, product_image, product_id])
             console.log("product updated successfully");
            
        } catch (error) {
            throw error;
        }
}
//delete a product
const deleteProduct = async (product_id)=>{
    try {
        await executeQuery(queries.deleteProduct, [product_id])        
        console.log(`The product with id ${product_id} has been deleted`);
    } catch (error) {
        throw error;
    }
}
    
//get products
const  getProducts = async ()=>{
    try {
        const result = await executeQuery(queries.getProducts);
        return result;
    } catch (error) {
        throw error
    }
}
//get product by id 
const getProductByID = async (product_id) =>{
    try {
        const result = await executeQuery(queries.getProductByID, [product_id])
        return result;
    } catch (error) {
        throw error;
    }
}
//get the product count
const getProductCount = async () =>{
    try {
        const result = await executeQuery(queries.getProductCount);
        return result;
    } catch (error) {
        throw error
    }
}
//initialize database
const initializeDatabase = async ()=>{
    try {
        await createDatabaseIfNotExists()
        await executeQuery(queries.useDatabaseQuery);
        await createTableIfNotExists();       
    } catch (error) {
        throw error;
    }
}

module.exports = {
    initializeDatabase,
    pool,
    insertUser,
    selectUserByEmail,
    selectUsers,
    selectUserByRole,
    insertProduct,
    updateProduct,
    deleteProduct,
    getProducts,
    getProductByID,
    getProductCount
}