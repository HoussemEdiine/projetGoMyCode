const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { createProduct } = require('./ProductController')

module.exports = {

    async userLogin (req , res) {
        const {email , password} = req.body
        
        
        try {
            if(!email || !password){
                return res.status(200).json({
                    message : "messinf fields ..."
                })
            }
            const user = await User.findOne({email})
            if(!user){
                return res.status(200).json({
                    message : 'user not found'
                }) 
            }

            if(user && await bcrypt.compare(password, user.password)){
              const  userResp ={
                 _id : user._id,
                 email : user.email,
                 firstname : user.firstname,
                 lastname : user.lastname
              }
              //return res.json(userResp)
              return jwt.sign({user : userResp},'secret',(err,token)=>{
                  return res.json({
                      user : token ,
                      user_id : user._id 

                  }) 
                        
              })
            }
            else{
                return res.status(200).json({
                    message:'wrong password..'
                })
            }


        } catch (error) {
            throw Error(`error while login a user ${error}`)
        }
    },
    getUsername (req,res) {
    jwt.verify(req.token ,'secret', (err,authData)=>{
 
   if(err){
       res.sendStatus(403)
   }
 
 else { 
 
 const {userid} = req.params
try {
   
    const username =  User.findById(userid)
    if(username){
        return res.json({authData:authData , username : username.firstname})
    }
    
} catch (error) {
    throw Error(error)
}
    }
    })
   }


}