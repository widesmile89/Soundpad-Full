const express=require("express")
const bcrypt=require("bcrypt")
const {User,registerValidation,
    loginValidation,} = require("../model/user")
const router=express.Router()


/**
 * @desc Add New User
 * @route api/auth/register
 * @method post
 * @access public
 * @status_code (-1) => ( already register) , (-2)=>(not found)
 * @status_code (1) => ( success)
 */
router.post(("/register"),async(req,res)=>{

    const {error}= registerValidation(req.body)

    if(error){
        res.status(400).json({

                status_code:-1,
                message: error.message,
                data: null,
                error: error.message
        })

    }

    let user = await User.findOne({
        email:req.body.email
    })

    if(!user){

        const salt = await bcrypt.genSalt(10)
        req.body.password =await bcrypt.hash(req.body.password , salt)

        user = new User({
            email:req.body.email,
            userName:req.body.userName,
            password:req.body.password,
            isSeller:req.body.isSeller,
            isAdmin:req.body.isAdmin
        })
        const token = user.generateToken()

        user.token = [token]
        user = await user.save()


    const{password,...other} = user._doc
    res.status(200).json({
        status_Code:1,
        message:"success process",
        data: {...other,token},
        error:null


    });

    } else{

        res.status(400).json({

            status_Code:-1,
            message:"user is already register",
            error: "user is already register",
            data:null
        })
    }

})



router.post(("/login"),async(req,res) =>{

    const {error} = loginValidation(req.body)

    if(error){
        res.status(400).json({
            
                status_code:-2,
                message:error.message,
                data:null,
                error:null



        })
    }


const user = await User.findOne(
    { email:req.body.email },
)

const thisToken = user.generateToken()

user.token.push(thisToken)
user.save()

const{
     password,
     token,
    ...other 
} = user._doc

if(user){
    res.status(200).json({
        status_code: 1,
        message: "logged in successfuly",
        data: {...other},
        error:null

    })

}else{

    res.status(404).json({

            status_Code: -2,
            message: "user not found" ,
            error: "user not found",
            data:null
    })

}
})

module.exports = router



