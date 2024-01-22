
const jwt=require("jsonwebtoken")

function verifytoken(req,res,next){

    const token = req.headers.token
    
    if(token){

        try{
                const decoded= jwt.verify(token,process.env.JWT_SECRET_KEY);

                req.user = decoded;

                next();

        }catch(error){

                res.status(400).json({message:"invalid token " ,error});
             }

    }else{

         res.status(401).json({message:"no token provide " });
    }
}


function verifytokenAndAuthorization(req,res,next){

    verifytoken(req,res,() => {

        

        if(req.user.id == req.params.id || req.user.isAdmin){


             next();

        }else{
         res.status(201).json({message:`you are not allowed`});

        }


    })
}


function verifytokenAndAdmin(req,res,next){

    verifytoken(req,res,() => {

        if(req.user.isAdmin){

             next();

        }else{
            return res.status(201).json({message:`you are not admin`});

        }

    })
}
module.exports = { 
    
    verifytokenAndAuthorization,
    verifytokenAndAdmin
}