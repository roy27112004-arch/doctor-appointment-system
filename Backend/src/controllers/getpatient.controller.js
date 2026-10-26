const diseasemodel=require("../models/disease.model")
const jwt=require('jsonwebtoken')
async function patientlist(req,res){
    const token=req.cookies.logtoken;
    if(!token){
        return res.status(401).json({"massage":"unauthorized access"})
    }
    const decoded=await jwt.verify(token,process.env.JWT_SECRET)
    if(!decoded){
        return res.status(401).json({"massage":"unauthorized access"})
    }
    if(decoded.role!=="Doctor"){
        return res.status(400).json({"massage":"only doctors are allowed to cheak list"})
    }
    const patientlist=[]
    const patients=await diseasemodel.find().populate("patient")
    patientlist.push(patients)
    res.status(201).json({"massage":"patient list found",patientlist})
}
module.exports={patientlist}