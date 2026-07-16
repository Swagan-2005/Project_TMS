const mongoose=require("mongoose")
// require("dotenv").config();
const mongodb=async()=>{
    try{
        
        await mongoose.connect("mongodb+srv://swathigangatharan2005_db_user:Swagan_2005@cluster0.4brqwwb.mongodb.net/besant?appName=Cluster0")
        console.log("DB Connected Successfully")
    }
    catch(err){
        console.log("DB is not connected")
        console.log(err)
    }
}
module.exports=mongodb