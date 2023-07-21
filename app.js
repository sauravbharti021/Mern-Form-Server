const dotenv = require('dotenv')

const express= require('express')

const app= express()

const cookieParser= require('cookie-parser')
app.use(cookieParser())




dotenv.config({path: "./config.env"})
require('./db/connection')

const port= process.env.PORT || 5000
const User = require('./models/userSchema')

app.use(express.json())
app.use(require('./routing/auth'))



// function middleware(req, res, next){
//     next()
// }
// app.get('/about', middleware, (req,res)=>{
//     res.send('Nothing to know about me')
// })

// app.get('/contact', (req,res)=>{
//     res.send('contacts')
// })
// app.get('/signin',(req, res)=>{
//     res.send('signin')
// })
// app.get('/register',(req, res)=>{
//     res.send('register kro lo yaar')
// })
// app.get('/home',(req, res)=>{
//     res.sendFile(__dirname + "/home.html")
// })

if(process.env.NODE_ENV==="production"){
    app.use(express.static("client/build/index.html"))
}

app.listen(port, ()=>{
    console.log(`Server is running at port ${port}`)
})