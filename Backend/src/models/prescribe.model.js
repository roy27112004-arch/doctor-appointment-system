const mongoose=require('mongoose')
const prescribeSchema=new mongoose.Schema({
    patientID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    name:{
        type:String,
    },
    prescription:{
        type:String,
        required:true
    }
})
const prescribemodel=mongoose.model("prescription",prescribeSchema)
module.exports=prescribemodel