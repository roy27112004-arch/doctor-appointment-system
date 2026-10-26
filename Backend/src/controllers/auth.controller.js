const usermodel=require('../models/user.model')
const brcypt=require('bcrypt');
const jwt=require('jsonwebtoken')
const cookie=require('cookie-parser')
const blacklistmodel=require('../models/logout.model')

async function registeruser(req,res){
    const {username,email,password,role}=req.body;
    if(!username || !email || !password|| !role){
        return res.status(400).json({"massage":"all fields are required"})
    }
    const isuserexist=await usermodel.findOne({$and:[{username},{email}]});
    if(isuserexist){
        return res.status(400).json({"massage":"user allready exists"})
    }
    //hash password
    const hashed=await brcypt.hash(password,10);
    const user=await usermodel.create({
        username,email,password:hashed,role
    })
    //create token
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
    res.cookie("token",token)
    res.status(201).json({"massage":"User created",user})
}

async function login(req,res){
    const{username,email,password,role}=req.body;
    if(!username || !email || !password){
        return res.status(400).json({"massage":"all required field"})
    }
    isuserexist=await usermodel.findOne({$and:[{username,email}]})
    if(!isuserexist){
        return res.status(400).json({"massage":"user not found"})
    }
    //cheak password
    const decode=await brcypt.compare(password,isuserexist.password)
    if(!decode){
        return res.status.json({"massage":"not a valid password"})
    }
    //send token after login
    const logtoken=jwt.sign({id:isuserexist._id,role:isuserexist.role},process.env.JWT_SECRET)
    //send to cookie
    res.cookie("logtoken",logtoken)
    //if user valid
    res.status(201).json({"massage":"login successful",user:isuserexist})
}
async function logout(req,res){
    const token=req.cookies.logtoken;
    if(!token){
        return res.status(400).json({"massage":"user not logged in"})
    }
    const hashedtoken=await brcypt.hash(token,10)
    res.clearCookie("logtoken");
    await blacklistmodel.create({
        token:hashedtoken
    })
    res.status(201).json({"massage":"logged out successfully"})
}
module.exports={registeruser,login,logout};