const Student=require("../model/Studentmodel")
const createstudent=async(req,res)=>{
    try{
        const data=req.body;
        const datadb=await new Student(data);
        const dbadd=await datadb.save();
        res.send("created successfully")
    }
    catch(err){
        res.send(err)
    }
}
const getstudent=async(req,res)=>{
    try{
        const data=await Student.find();
        res.send(data)
    }
    catch(err){
        res.send(err)
    }
}
const searchstudent=async(req,res)=>{
    try{
        const data=req.query;
        const final=await Student.find(data);
        if(final.length>0){
            res.send(final)
        }
        else{
            res.send("Not Found")
        }
    }
    catch(err){
        res.send(err);
    }
}
const updatestudent=async(req,res)=>{
    try{
        const id=req.params.id;
        const data=req.body;
        const up=await Student.findByIdAndUpdate(id,data);
        res.send("updated successfully");
    }
    catch(err){
        res.send(err)
    }
}
const deletestudent=async(req,res)=>{
    try{
        const id=req.params.id;
        const del=await Student.findByIdAndDelete(id);
        res.send("deleted successfully")
    }
    catch(err){
        res.send(err)
    }
}
module.exports={createstudent,getstudent,updatestudent,deletestudent,searchstudent}
