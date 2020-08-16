const Prouct = require('../models/Product')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
module.exports = {
     createProduct(req,res){
        jwt.verify(req.token ,'secret', async(err,authData)=>{
        if(err){
            res.sendStatus(403)
        }
        else{
            try {
    
            const {name,discription,price,category}=req.body
            const {filename} = req.file
           
            const user = await User.findById(authData.user._id)
           
            if(!user){
                return res.status(400).json({
                    message:'user does not exist !!'
                })
            }
            const product = await Prouct.create({
                name,
                discription,
                price,
                user:authData.user._id,
                img : filename,
                category
            })
            if(product){
                return res.json({authData , product})
            }
            
            
        } catch (error) {
           return res.json({
               message :`error ${error}`
           }) 
            
        }
    }
    })
    },


    async getProductByid (req,res){
         const {productid} = req.params
         try {
             const product = await Prouct.findById(productid)
             if(product) {
                 
                 return res.json(product)
             }
             
         } catch (error) {
             return res.status(400).json({
                 message:'product id not found !'
             })
         }

    },
    
    async getByCategory(req,res){ 
       const { category } = req.params
       const query =   { category } 
        try {
            const product = await Prouct.find(query)
            
            if (product) {     
              return res.json(product)  
            }
            
        } catch (error) {
            return res.status(400).json({
                message:'products not found !!!'
            })
            
        }
    },
    
    async getAllProducts (req,res){
        
        try { const product = await Prouct.find({})
            
        if(product){
            return res.json(product)
        }
             
        } catch (error) {
            return res.status(400).json({
                message:'nothing found...'
            })
        }
    }
   

}