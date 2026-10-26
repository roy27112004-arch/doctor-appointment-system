const express=require('express')
const router=express.Router();
const listcontroller=require("../controllers/getpatient.controller")

router.get("/patientlist",listcontroller.patientlist)
module.exports=router;