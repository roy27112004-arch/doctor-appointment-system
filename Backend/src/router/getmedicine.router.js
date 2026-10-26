const express=require('express')
const router=express.Router()
const getprescriptioncontroller=require('../controllers/getprescription.controller')
router.get("/getmedicine",getprescriptioncontroller.getprescription)
router.get("/cheakprescribe",getprescriptioncontroller.cheakprescribe);

module.exports=router;