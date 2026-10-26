const express=require('express')
const router=express.Router();
const prescribecontroller=require("../controllers/prescribe.controller")
const multer=require('multer')

const upload = multer({
    storage: multer.memoryStorage()
});

router.post("/prescribe",upload.single("prescription"),prescribecontroller.prescribe);

module.exports=router;
