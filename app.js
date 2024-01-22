const express = require('express')
const connectingDataBase = require ("./core/configdb/dataBase")
require("dotenv").config()

connectingDataBase()

const app = express()

//middle were
app.use(express.json())

//router
app.use("/api/auth",require("./features/auth/routes/auth"))
app.use("/api/users",require("./features/auth/routes/users"))

const port =process.env.PORT
app.listen(port, () => console.log(`server is running on port ${port}!`))
