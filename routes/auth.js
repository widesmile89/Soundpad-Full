const express=require("express")

const {User} = require("../model/user")
const router=express.Router()



router.post(("/register"),async(req,res)=>{

    let user = await User.findOne({email:req.body.email})

    if(!user){

        user = new User({
            email:req.body.email,
            userName:req.body.userName,
            password:req.body.password,
            isSeller:req.body.isSeller,
            isAdmin:req.body.isAdmin
        })
      user.save()

        res.status(200).json(user)
    } else{
        res.status(400).json({message:"user is already register"})
    }

})



router.post(("/login"),async(req,res) =>{


const user = await User.findOne({email:req.body.email})

if(user){
    res.status(200).json(user)

}else{

    res.status(404).json({message:"user not found"})

}




})






module.exports = router



