const dotenv = require('dotenv')

const express= require('express')
const cors= require('cors')

const app= express()
const path= require('path')

app.use(cors())
const cookieParser= require('cookie-parser')
app.use(cookieParser())



dotenv.config({path: "./config.env"})
require('./db/connection')

const port= process.env.PORT || 5000
const User = require('./models/userSchema')


app.use(express.json())
app.use(require('./routing/auth'))



app.listen(port, ()=>{
    console.log(`Server is running at port ${port}`)
})