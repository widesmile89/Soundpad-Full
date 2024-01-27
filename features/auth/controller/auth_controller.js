const bcrypt=require("bcrypt")
const {User,registerValidation,loginValidation,ChangePasswordValidator,resetPasswordValidator} = require("../model/user")
const otpCode =require("../../otp/otp")
//>>>>>>>>>>>>>>>>>>>>>>>>Start code here <<<<<<<<<<<<<<<
  class AuthController {

    /**
     * 
     * @desc login user
     * @route password/login
     * @method post
     * @access public 
     */

    static async login(req,res) {

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
            data: {
                ...other,
                token: thisToken
            }
        })
    }else{
        res.status(404).json({
                status_Code: -2,
                message: "user not found" ,
                error: error.message,
                data:null
        })

    }

    }
    /**
     * @desc login user
     * @route password/login
     * @method post
     * @access public 
     */
    static async register(req,res){
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
    
    }
    /**
     * 
     * @desc logout user
     * @route password/logout/id
     * @method post
     * @access public 
     */
    static async logout(req,res){ 
      const user = await User.findById(req.params.id).select("-password")
      if(user){
        try {

          user.token = []

          user.save()

          res.status(200).json({
            status_Code:1,
            message:"Success to logout",
            error:null,
            data:user
            
  
          })

        } catch (error) {
          res.status(404).json({
            status_Code:-4,
            message:"user id not found",
            error:error.message,
            data:null
  
          })
        }

      }else{
        res.status(500).json({
          status_Code:-4,
          message:"server down",
          error:error,
          data:null

        })

      }

    }
    /**
     * @desc reset password
     * @route password/resetpassword/id
     * @method post
     * @access public 
     */
    static async resetPassword(req,res){

      const {error} = resetPasswordValidator(req.body)
      if(error){
        res.status(400).json({
          status_Code:-1,
          message:" validation error ",
          error:error.message,
          data:null
        })
      } else if(req.body.newPassword !== req.body.confirmPassword){
        res.status(400).json({
          status_Code:-2,
          message: "the new password must equal the confirmed password",
          error:error.message,
          data:null
        
        })
      }
      else {
        let user = await User.findById(req.params.id)
        if(user){

          const isATruePassword = bcrypt.compareSync(req.body.oldPassword,user.password)

          if(isATruePassword){
            const generateOTP = require("otp-generator")
                const otpCode = generateOTP.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
                    console.log('OTP:', otpCode);


            
            user.password = (await bcrypt.hash(req.body.newPassword,10)).toString()
            user.save()
            
          }else {
            res.status(400).json({message:"the password is wronge"})
          }
               }else{
              res.status(404).json({message:"User is not Found"})
             }
      }
    }
    /**
     * 
     * @desc changr password by old and new pass
     * @route password/changePassword/id
     * @method post
     * @access public 
     */
    static async changePassword(req,res){

      const {error}=ChangePasswordValidator(req.body)
  
      if(error){
  
        res.status(400).json({message:error.message})
  
      } else if(req.body.newPassword !== req.body.confirmPassword){
  
        res.status(400).json({message: "the new password must equal the confirmed password"})
  
      }
      else {
  
        let user = await User.findById(req.params.id)
  
        if(user){
  
          const isATruePassword = bcrypt.compareSync(req.body.oldPassword,user.password)
  
  
          if(isATruePassword){
  
            user.password = (await bcrypt.hash(req.body.newPassword,10)).toString()
  
            .then((doc)=> {
  
              const {password,...other} = doc._doc
  
              res.status(200).json({
                status_Code : 1,
                message: `otp send `,
                data : {
                  ...other, otpCode , user

                },
                error : null
              })
  
            })
            .catch((error)=> {
              res.status(500).json({message:error.message})
  
            })
  
  
  
          }else {
  
            res.status(400).json({message:"the password is wronge"})
  
          }
  
  
    
        }else{
              res.status(404).json({message:"User is not Found"})
        }
  
      }

    }

  }

module.exports = AuthController