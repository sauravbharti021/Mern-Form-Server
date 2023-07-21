
const jwt= require('jsonwebtoken')
const User=  require('../models/userSchema')

async function authentication(req, res, next){
    try{
        const token = req.cookies.jwtToken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY)

        const currentUser= await User.findOne({_id : verifyToken._id , "tokens.token" : token   })
       
        if(!currentUser){
            throw new Error('User not found')
        }

        req.token = token
        req.currentUser= currentUser
        req.userId = currentUser._id

        next()
    }
    catch(err){
        console.log(err + ": token missing")
        res.status(401).json({message: 'unauthorized no token'})
    }

}

module.exports = authentication