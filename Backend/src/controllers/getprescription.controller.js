const prescribemodel=require("../models/prescribe.model")
const jwt=require('jsonwebtoken')
async function getprescription(req,res) {
   
    const token=req.cookies.logtoken;
    if(!token){
        return res.status(401).json({"massage":"unauthorized token"})
    }
    const decode=await jwt.verify(token,process.env.JWT_SECRET)
    if(!decode){
        return res.status(401).json("unauthorized access")
    }
    const patientdetails=await prescribemodel.findOne({patientID:decode.id})
    if(!patientdetails){
        return res.status(400).json({"massage":"no patient found,please rectify your disease"})
    }
    const prescript=patientdetails.prescription
    if(!prescript){
        return res.status(400).json({"massage":"Your prescription is not ready yet"})
    }
    console.log(patientdetails)
    res.status(200).json({"massage":"your prescription is ready",prescript})
}
//doctor also can see the prescription
async function cheakprescribe(req,res){
    const token=req.cookies.logtoken;
    if(!token){
        return res.status(401).json({"massage":"unauthorized access"})
    }
    const decoded=await jwt.verify(token,process.env.JWT_SECRET)
    if(!decoded){
        return res.status(401).json({"massage":"unauthorized access"})
    }
    if(decoded.role!="Doctor"){
        return res.status(400).json({"massage":"only doctors can cheak prescription"})
    }
    const lists=await prescribemodel.find()
    const rawfiles=lists.map((lists)=>{
        return {prescription:lists.prescription,name:lists.name};
    })
    
    
    return res.status(200).json({"massage":"prescriptions found",rawfiles})
}
module.exports={getprescription,cheakprescribe}