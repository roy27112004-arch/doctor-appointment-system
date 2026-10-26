const express=require('express')
const router=express.Router();
const diseasecontroller=require("../controllers/disease.controller")

router.post("/disease",diseasecontroller.describedisease);

module.exports=router;
