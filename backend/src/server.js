
const express = require('express')
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')
const routes = require('./route')
const app = express()
const Port = process.env.Port || 8000

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}


app.use(cors())
app.use(express.json())

try {
    mongoose.connect(process.env.MONGO_DB_CONNECTION, {
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    console.log('mongoo connected ....')
} catch (error) {
    console.log(error)
}
app.use('/filename',express.static(path.resolve(__dirname,'..','filename')))
app.use(routes)

app.listen(Port ,()=>{
    console.log(`sever running  on ${Port}......`)
})