const mysql = require('mysql')
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
    selectUserByRole
}