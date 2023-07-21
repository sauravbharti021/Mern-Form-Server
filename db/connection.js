const mongoose = require('mongoose')
const db= process.env.DATABASE

main().then(()=> console.log('successfully connected')).catch(err=> console.log(err))

async function main(){
    await mongoose.connect(db)
}