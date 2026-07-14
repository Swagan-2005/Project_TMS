const Course=require("../model/Coursemodel")
const createcourse=async(req,res)=>{
    try{
    const data=req.body;
    const datadb=await new Course(data);
    const dataadd=await datadb.save();
    res.send("created successfully")
    }
    catch(err){
        res.send(err)
    }
}
const getcourse=async(req,res)=>{
    try{
        const datas=await Course.find();
        res.send(datas)
    }
    catch(err){
        res.send(err)
    }
} 
const searchcourse=async(req,res)=>{
    try{
        const data=req.query;
        const final=await Course.find(data);
        if(final.length>0){
            res.send(final)
        }
        else{
            res.send("Not Found")
        }

    }
    catch(err){
        res.send(err)
    }
}
const updatecourse=async(req,res)=>{
    try{
        const id=req.params.id;
        const data=req.body;
        const up=await Course.findByIdAndUpdate(id,data,{new:true});
        res.send({
            msg:"updated successfully",
            data:up
        })
    }
    catch(err){
        res.send(err)
    }
}
const deletecourse=async(req,res)=>{
    try{
        const id=req.params.id;
        const del=await Course.findByIdAndDelete(id);
        res.send("Deleted successfully")
    }
    catch(err){
        res.send(err)
    }
}
module.exports={createcourse,getcourse,updatecourse,deletecourse,searchcourse}