const mysql = require('mysql')
const dbConfig = require('../Config/config')

const pool = mysql.createPool(dbConfig);

const executeQuery = (query, values=[])=>{
    return new Promise((resolve, reject)=>{
        pool.query(query,values,(err, result)=>{
            if(err){
                reject(err)
            }else{
                resolve(result)
            }
        })
    })
}