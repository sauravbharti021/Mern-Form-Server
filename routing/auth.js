const express = require('express')
const jwt= require('jsonwebtoken')
const router = express.Router()
const bcrypt = require('bcrypt')
const BASE_URL = process.env.BASE_URL

require('../db/connection')
const User = require('../models/userSchema')
const authentication = require('../middleware/authentication')


router.get('/',(req,res)=>{
    res.send("hello lalla")
})

router.post('/register', async (req, res)=>{
    console.log(req.body);
    const {name, email, phone , work, password, confirmPassword, address} = req.body;
    if(!name || !email || !phone || !work || !password || !confirmPassword || !address ){
        return res.status(400).json({error:"Please fill the required input correctly."})
    }
    if((password!=confirmPassword)){
        return res.status(400).json({error:"Your passwords did not match."})
    }

    try{
        const userExist= await User.findOne({email: email});
        
        if(userExist){
            return res.status(422).json({error:"Already registered with this email."})
        }
        
        const user = new User({name, email, phone, work, password, confirmPassword, address});

        const saved = await user.save();
        
        if(saved){
            res.status(201).json({message:"User successfully registered."})
        }
      

    }catch(err){
        console.log(err)
    }



    console.log(req.body)
    // res.send('running')
})

router.get('/login', (req, res)=>{
    res.send("login page");
})
router.post('/login', async (req, res)=>{

    const {email, password} = req.body;

    if(!email || !password) {
        return res.status(400).send("Kindly fill the required input correctly.");
    }


    try{
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(422).send("Email not registered.")
        }else{
            const match = await bcrypt.compare(password, user.password);
            
            const token = await user.generateAuthToken()

            res.cookie('jwtToken', token, {
                    expires: new Date(Date.now()+ 25892000000),
                    httpOnly: true
            })

            if(!match){
                return res.status(400).send("Invalid credentials")
            }

            return res.status(200).json({message: "Successful"})
        }

    }catch(err){
        console.log(err);
    }

})
router.post('/contact', authentication, async (req, res)=>{
    try{
        const {email, phone, address, message} = req.body

        const user= await User.findOne({_id: req.userId})

        if(user){
            const userContact = await user.addContact(email, phone, address, message)
            await user.save()

            res.status(201).json({message: "auth saved the user's message."})
        }

    }catch(error){
        console.log(error)
    }
})


// for middleware auth
router.get('/about', authentication, (req, res)=>{
    
    console.log('Nothing to know')
    res.send(req.currentUser)
})
router.get('/home', authentication,(req, res)=>{
    console.log("idhr")
    res.send(req.currentUser)
})

router.get('/logout',(req, res)=>{
    res.clearCookie("jwtToken", {path : '/  '})
    res.status(200).send("logged out")
})
router.get('/navigate', authentication, (req, res)=>{
    console.log('navi');
    res.send(req.currentUser)
})
router.get('/getData', authentication, (req, res)=>{
    res.status(200).send(req.currentUser)
})


module.exports= router