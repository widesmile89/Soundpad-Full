
const { string } = require("joi")
const mongoose = require("mongoose")




const UserSchema = mongoose.Schema({
    email:{
        type:String,
        minlenght:[3,"so short email "],
        maxlenght:[32,"so long than email letter "],
        required:true,
        trim:true



    },
    userName:{
        type:String,
        minlenght:[3,"so short email "],
        maxlenght:[32,"so long than email letter "],
        required:true,
        trim:true
    },
    password:{

        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
     token:{
        type:[String],
        default:[]
     }
})
const User = mongoose.model("User",UserSchema)

module.exports = {User}