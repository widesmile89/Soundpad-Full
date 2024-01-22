const express = require('express')
const connectingDataBase = require ("./configdb/dataBase")
require("dotenv").config()

connectingDataBase()

const app = express()

//middle were
app.use(express.json())

//router
app.use("/api/auth",require("./features/auth/routes/auth"))
app.use("/api/users",require("./features/auth/routes/users"))




//err handling
app.all("*",(req,res,next)=>{
    // const err = new Error(`can't find this route ${req.originalUrl}`)
    next(new Apierror (`can't find this route ${req.originalUrl}`,400))
})

//global handling midlle were
app.use((err,req,res,next)=>{
    err.statusCode=err.statusCode || 500;
    err.status = err.status || "error"

        res.status(err.statusCode).json({
            statusCode:err.statusCode,
            message:err.message,
            err:err,
            stack:err.stack
        })
})

const port =process.env.PORT
app.listen(port, () => console.log(`server is running on port ${port}!`))
