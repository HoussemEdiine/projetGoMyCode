const Prouct = require('../models/Product')
const User = require('../models/User')
module.exports = {
    async createProduct(req,res){
        try {
    
            const {name,discription,price,category}=req.body
            const {user_id} = req.headers
            const {filename} = req.file
            const user = await User.findById(user_id)
            if(!user){
                return res.status(400).json({
                    message:'user does not exist !!'
                })
            }
            const product = await Prouct.create({
                name,
                discription,
                price,
                user:user_id,
                img : filename,
                category
            })
            return res.json(product)
            
        } catch (error) {
           return res.json({
               message :'something wrong '
           }) 
            
        }
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
       const query =   { category }  || {}
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