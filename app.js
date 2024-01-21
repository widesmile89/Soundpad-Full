const express = require('express')

const connectingDataBase = require ("./configdb/dataBase")

require("dotenv").config()

connectingDataBase()




const app = express()



//middle were
app.use(express.json())




//router
app.use("/api/auth",require("./routes/auth"))
app.use("/api/users",require("./routes/users"))



const port =process.env.PORT
app.listen(port, () => console.log(`server is running on port ${port}!`))
