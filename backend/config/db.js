const mongoose=require("mongoose")
const mongodb=async()=>{
    let url="mongodb://localhost:27017/besant"
    try{
        await mongoose.connect(url)
        console.log("DB Connected")
    }
    catch{
        console.log("DB is not connected")
    }
}
module.exports=mongodb