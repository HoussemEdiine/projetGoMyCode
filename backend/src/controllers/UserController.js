const User = require('../models/User')
const bcrypt = require('bcrypt')

 
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
                firstname,
                lastname,
                password:hashPassword,
                email
            }) 
         return res.json({
             _id:user._id,
             firstname:user.firstname,
             lastname:user.lastname,
             email:user.email
         })
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