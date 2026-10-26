const mongoose=require('mongoose')
async function connectDb() {
    try{
        await mongoose.connect(process.env.DB_URI)
        console.log("database connected....")
    }
    catch(err){
        console.log("internal server error",err)
    }
}
module.exports=connectDb