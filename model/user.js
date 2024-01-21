
const mongoose = require("mongoose")
const joi=require("joi")
const jwt=require("jsonwebtoken")


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



UserSchema.methods.generateToken = function(){

    return jwt.sign({id : this._id ,
         isAdmin: this.isAdmin,randomNumber : Math.random()}
         ,process.env.JWT_SECRET_KEY ,{expiresIn:"100d"})

 }

const User = mongoose.model("User",UserSchema)

function registerValidation(obj){
    const Schema=joi.object({
        email:joi.string().trim().min(3).max(32).required() ,
        userName: joi.string().trim().min(3).max(32).required() ,
        password:joi.string().required()
        
    })
    return Schema.validate(obj)

}

function loginValidation(obj){
    const Schema=joi.object({
        email:joi.string().trim().min(3).max(32).required(),
        password:joi.string().required()
        
    })
    return Schema.validate(obj)

}


function updateValidation(obj){
    const Schema=joi.object({
        email:joi.string().trim().min(3).max(32) ,
        userName: joi.string().trim().min(3).max(32) ,
        password:joi.string()
        
    })
    return Schema.validate(obj)

}


module.exports = {
    User,
    registerValidation,
    loginValidation,
    updateValidation
}