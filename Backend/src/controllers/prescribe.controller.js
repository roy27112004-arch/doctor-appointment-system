const diseasemodel=require("../models/disease.model")
const prescribemodel=require("../models/prescribe.model")
const jwt=require('jsonwebtoken')
const multer=require('multer')
const upload=multer({storage:multer.memoryStorage()})
const uploadfile=require("../services/prescribe.service")

async function prescribe(req,res){
    const{patientID,name}=req.body;
    const logintoken=req.cookies.logtoken;
    if(!logintoken){
        return res.status(401).json({"massage":"unauthorized access"})
    }
    const decoded=await jwt.verify(logintoken,process.env.JWT_SECRET);
    if(!decoded){
        return res.status(401).json({"massage":"unauthorized token"})
    }
    if(decoded.role!="Doctor"){
        return res.status(400).json({"massage":"only doctors are allowed to prescribe"})
    }
    const ispatientexist=await diseasemodel.findOne({$and:[{patient:patientID},{username:name}]});
    if(!ispatientexist){
        return res.status(400).json({"massage":"no patient exist"})
    }
    const prescribe=await uploadfile(req.file.buffer)
    const medicine=await prescribemodel.create({
        patientID:patientID,
        name:name,
        prescription:prescribe.url
    })
    res.status(201).json({"massage":"medicine prescribed",medicine})

}
module.exports={prescribe}