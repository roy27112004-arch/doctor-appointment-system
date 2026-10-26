const dotenv=require('dotenv');
dotenv.config();
const express=require('express');
const app=express();
const cors=require('cors')
const cookieParser=require('cookie-parser')
const authrouter=require("../src/router/auth.router")
const diseaserouter=require("../src/router/disease.routes")
const patientrouter=require("../src/router/patitenlist.router")
const prescriberouter=require("../src/router/prescribe.routes")
const getprescriptionrouter=require("../src/router/getmedicine.router")

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json())
app.use(cookieParser())



app.use("/api/auth",authrouter)

app.use("/api/dis",diseaserouter);

app.use("/api/list",patientrouter);

app.use("/api/auth",prescriberouter);

app.use("/api/auth",getprescriptionrouter);

module.exports=app;