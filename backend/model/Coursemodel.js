const mongoose=require("mongoose")
const courseSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    fees:{
        type:Number,
        required:true
    },
    Syllabus:{
        type:String
    },
    mode:{
        type:String
    },
    status:{
        type:String,
        required:true
    }

})
module.exports=mongoose.model("Course",courseSchema)