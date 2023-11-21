const dbConfig = require('../Config/config')
const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`
const showDatabasesQuery = `SHOW DATABASES LIKE "${dbConfig.database}"`;


module.exports ={
    createDatabaseQuery,
    showDatabasesQuery
}