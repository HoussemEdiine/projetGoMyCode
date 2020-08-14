const express = require('express')
const multer = require('multer')
const UserController = require('./controllers/UserController')
const ProductController = require('./controllers/ProductController')
const LoginController = require('./controllers/LoginController')
const User = require('./models/User')
const uploadConfig = require('./config/upload')

const routes = express.Router()
const upload = multer(uploadConfig)

routes.get('/',(req,res)=>{
    res.send('running on express server....')
})
//find all users
routes.get('/users',(req,res)=>{
    User.find(( err,user) => res.send(user)
    )
})
// get method  user bye id
routes.get('/user/:userid',(req,res)=>{
    User.findById(req.params.userid,(err,user)=>res.send(user))
})

//Login 
routes.post('/login',LoginController.userLogin)

//produit
routes.get('/products',ProductController.getAllProducts)
routes.get('/products/:category',ProductController.getByCategory)
routes.get('/product/:productid',ProductController.getProductByid)
routes.post('/product',upload.single('img'),ProductController.createProduct)

//user
 routes.post('/register',UserController.store)
 //routes.post('/user/:userid',UserController.getUserByid)



 module.exports = routes
