const mongoose = require( "mongoose")


async function connectingDataBase ( ) {


            try {

            await mongoose.connect(process.env.MONGO_URI)

                console.log("Data base is connection....");
            } catch (error) {

                console.log("data base is not connection!",error) ;
            }
    };


module.exports = connectingDataBase
