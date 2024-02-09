require('dotenv').config();
const express = require('express')
const dbHandler = require('./Database/dbHandler')
const bodyParser = require('body-parser');
const authRoutes = require('./Routes/auth.routes')
const app = express();
const port = process.env.PORT;
app.use(bodyParser.json())
//connect to a database
dbHandler.pool.getConnection((err, connection)=>{
    if(err) throw err;
    console.log("MySQL connected successfully");
    dbHandler.initializeDatabase()
    .then(()=>{
       connection.release()
    })
    .catch((err)=>{
        connection.release();   
        throw err;    
    })
})
app.use('/api/auth', authRoutes)

app.listen(port,()=>{
    console.log(`App started on http://localhost:${port}`);
})