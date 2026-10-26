const mongoose=require('mongoose');
const diseaseSchema=new mongoose.Schema({
    patient:{
        type:mongoose.Schema.Types.ObjectId,
    },
    username:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    disease:{
        type:String,
        required:true
    }
},{timestamps:true})
const diseasemodel=mongoose.model("disease",diseaseSchema)
module.exports=diseasemodel;