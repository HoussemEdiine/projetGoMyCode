const User = require('../models/User')
const bcrypt = require('bcrypt')

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
              return res.json(userResp)
            }
            else{
                return res.status(200).json({
                    message:'wrong password..'
                })
            }


        } catch (error) {
            throw Error(`error while login a user ${error}`)
        }
    }


}