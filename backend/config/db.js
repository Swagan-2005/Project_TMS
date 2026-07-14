const mongoose=require("mongoose")
require("dotenv").config();
const mongodb=async()=>{
    try{
        console.log(process.env.MONGO_URI)
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB Connected")
    }
    catch(err){
        console.log("DB is not connected")
        console.log(err)
    }
}
module.exports=mongodb