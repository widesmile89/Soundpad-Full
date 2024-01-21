const express = require("express")
// const {verifytokenAndAdmin,verifytokenAndAdmin}=require("../middlewere/verifyToken")
const {User,updateValidation} = require("../model/user")
const bcrypt=require("bcrypt")
const router = express.Router()


/***
 * @desc Get All Users 
 * @route api/users
 * @method get
 * @access public
 * @status_Code_error -1 => user not Found
 */
router.get(("/"),async(req,res)=>{

    const user = await User.find()

    try {

        if(user){

            res.status(200).json({
                status_code:1,
                message:"Success Process ",
                
                data:user
            })

        }else{

            res.status(404).json({

                status_code:-1,
                message:"User is Not Found ",
                error:error,
                data:null
            })
        }
    } catch (error) {

        res.status(400).json({message:message.error})
        
    }
})

router.route("/:id")

.get( async(req,res)=>{

    const user =await User.findById(req.params.id)
      if(user){res.status(200).json(user)
    }})

.put(async(req,res)=>{

    if(!req.body.id == req.params.id){
        return res.status(201).json({message:`you are can't edit profile`})
    }


    const {error}=updateValidation(req.body)
        if(error){
            return res.status(400).json({
                message:error.message })
            }

                
    if(req.body.password){

        const salt=await bcrypt.genSalt(10);
          req.body.password=await bcrypt.hash(req.body.password ,salt);

          }

        let user = await User.findByIdAndUpdate(req.params.id,{
            $set:{
                email:req.body.email,
                userName:req.body.userName,
                password:req.body.password
            }},{new:true})
        res.status(200).json(user)
})
.delete(async(req,res)=>{

    const user = await User.findByIdAndDelete(req.params.id)
    
    if(user){

        res.status(200).json({message:"user has been deleted"})

    }else{

        res.status(404).json({message:"user not found"})

    }
}
)




module.exports=router