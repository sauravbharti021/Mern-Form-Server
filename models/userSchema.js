const mongoose= require('mongoose')
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')


const userSchema= new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    messages: [
        {
            email : {
                type: String,
                required: true
            },
            phone: {
                type: Number,
            },
            address: {
                type: String
            },
            message:{
                type: String,
                required: true
            }
        }
    ],
    tokens:[
        {
            token:{
                type: String,
                required: true
            }
        }
    ]
})
// collection name, schema


userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password= await bcrypt.hash(this.password, 12)
        this.confirmPassword = await bcrypt.hash(this.confirmPassword, 12)
    }
    next()
})

userSchema.methods.generateAuthToken = async function(){
    try{
        let newToken = jwt.sign({_id : this._id}, process.env.SECRET_KEY)
        this.tokens= this.tokens.concat({token : newToken})

        await this.save();
        return newToken;
    }catch(err){
        console.log(err)
    }
}

userSchema.methods.addContact= async function(email, phone, address, message){
    try{
        this.messages= this.messages.concat({message: message, phone, email, address})
        await this.save()
        
        return this.messages
    }catch(error){
        console.log(error)
    }
}

const User= mongoose.model('users', userSchema)
module.exports= User