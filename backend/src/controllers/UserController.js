const User = require('../models/User')
const bcrypt = require('bcrypt')
const { get } = require('http')
const { RSA_NO_PADDING } = require('constants')
 
module.exports = {
    async store(req,res) {
        try {
            console.log(req.body)
            const {firstname, lastname, password, email} = req.body
            const existingUser = await User.findOne({email})
        // if the email of the user dont already exsist
            if(!existingUser){
                hashPassword = await  bcrypt.hash(password,10)
                const user = await User.create({
                firstname: firstname,
                lastname:lastname,
                password:hashPassword,
                email:email
            }) 
         return res.json(user)
            }
          return res.status(400).json({
              message : 'email already exist'
          })
           
        } catch (error) {
            console.log(error)
        }
    } ,
     async getUserByid (req ,res){
         try {
             const {userid} = req.params
             const user = await User.findById(userid)
             return res.json(user)
             
         } catch (error) {
             return res.status(400).json({
                 message : 'user id not found'
             })
             
         }

    
    }
  
}