const express=require("express")
const bcrypt=require("bcrypt")
const {User,registerValidation,
    loginValidation} = require("../model/user")
const AuthController= require("../controller/auth_controller")
const router=express.Router()


/**
 * @desc Add New User
 * @route api/auth/register
 * @method post
 * @access public
 * @status_code (-1) => ( already register) , (-2)=>(not found)
 * @status_code (1) => ( success)
 */
 router.post(("/register"),AuthController.register)



// router.post(("/login"),loginValidation,AuthController.login)

router.post("/logout/:id",AuthController.logout)

 router.post("/restpassword/:id",AuthController.resetPassword)


router.post(("/changepassword/:id"),AuthController.changePassword)
module.exports = router


