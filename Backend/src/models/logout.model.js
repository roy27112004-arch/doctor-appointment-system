const mongoose=require('mongoose')
const blacklistSchema=new mongoose.Schema({
    token:{
        type:String,
        required:true,
        unique:true
    },
    blacklistat:{
        type:Date,
        default:Date.now,
        immutable:true
    }
},{timestamps:true})
const blacklistmodel=mongoose.model("blacklistedtoken",blacklistSchema)
module.exports=blacklistmodel;