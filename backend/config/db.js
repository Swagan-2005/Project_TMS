const mongoose=require("mongoose")
require("dotenv").config();
const mongodb=async()=>{
    try{
        
        await mongoose.connect(process.env.MONGO_URL)
        console.log("DB Connected Successfully")
    }
    catch(err){
        console.log("DB is not connected")
        console.log(err)
    }
}
module.exports=mongodb