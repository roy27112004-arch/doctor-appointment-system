const usermodel=require("../models/user.model")
const diseasemodel=require("../models/disease.model")
const jwt=require('jsonwebtoken')
async function describedisease(req,res) {
    const{age,disease}=req.body;
    const logtokenfound=req.cookies.logtoken;
    if(!logtokenfound){
        return res.status(401).json({"massage":"you can't send request"})
    }
    //verify token
    const decode=jwt.verify(logtokenfound,process.env.JWT_SECRET);
    //only patient can submit disease
    if(decode.role!=="patient"){
        return res.status(400).json({"massage":"only patient can describe their disease"})
    }

    const userexist=await usermodel.findById(decode.id) 
    if(!userexist){
        return res.status(400).json({"massage":"wrong username/email"})
    }
    const diseaselist=await diseasemodel.create({
        patient:decode.id,
        username:userexist.username,
        age:age,
        email:userexist.email,
        disease:disease
    })
    return res.status(201).json({"massage":"disease submitted",disease:diseaselist})
}
module.exports={describedisease}