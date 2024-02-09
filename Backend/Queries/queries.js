const dbConfig = require('../Config/db.Config')
const createDatabase = `CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`
const showDatabases = `SHOW DATABASES LIKE "${dbConfig.database}"`
const showUsersTableQuery = 'SHOW TABLES LIKE "users"';
const createUserTableQuery = `CREATE TABLE users (
    ID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone INT,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255)      
)
`  
const useDatabaseQuery = `USE ${dbConfig.database}`;
const insertUsersQuery = 'INSERT INTO users (name, email,password,phone,role) VALUES (?, ?, ?, ?,?)';
const selectUserByEmail = 'SELECT * FROM users WHERE email = ?'
const selectUserByRole = 'SELECT * FROM users WHERE role = ? '
const selectAllUsers = 'SELECT * FROM users'
const showProductsTable = 'SHOW TABLES LIKE "Products"';
const createProductsTable = `CREATE TABLE Products (
    product_id INT  AUTO_INCREMENT PRIMARY KEY NOT NULL,
    product_name VARCHAR(255),
    product_description TEXT,
    product_rating FLOAT,
    product_image VARCHAR(255),
    product_price DECIMAL(10, 2)
);`   

const insertProducts = `INSERT INTO Product (product_id, product_name, product_description, product_rating, product_image, product_price)
VALUES (?, ?, ?, ?, ?, ?);
`
const updateProduct = `  UPDATE Product
  SET product_name = ?,
      product_description = ?,
      product_rating = ?,
      product_image = ?,
      product_price = ?
  WHERE product_id = ?;
`;
const getProducts = `SELECT * FROM Product ORDER BY product_id ASC`
 const deleteProduct = `DELETE FROM Products WHERE product_id = ?`
module.exports = {
    createDatabase,        
    showDatabases,
    showUsersTableQuery,
    createUserTableQuery,
    useDatabaseQuery,  
    insertUsersQuery,   
    selectUserByEmail,
    selectUserByRole,
    createProductsTable,
    insertProducts,
    showProductsTable,
    deleteProduct,    
    selectAllUsers, 
    updateProduct ,  
   getProducts
}