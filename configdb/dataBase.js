const mongoose = require( "mongoose")


async function connectingDataBase ( ) {

            try {

                await mongoose.connect(process.env.MONGO_URI)
                console.log("Database is connected...");

            } catch (error) {

                console.log("Database is not connected...",error) ;

            }
    };


module.exports = connectingDataBase
