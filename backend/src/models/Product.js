const mongoose = require('mongoose')
const ProductSchema = new mongoose.Schema({
name : String ,
discription:String,
price : Number,
img : String,
category : String
,
date : Date,
user :{
 type:mongoose.Schema.Types.ObjectId,
 ref :'User'
}
},{
    toJSON : {
        virtuals:true
    }
})
ProductSchema.virtual('img_url').get(function () {return `http://localhost:8000/filename/${this.img}`})
module.exports=mongoose.model('product',ProductSchema)