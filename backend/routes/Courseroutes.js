const express=require("express")
const route=express.Router()
const {createcourse,getcourse,updatecourse,deletecourse,searchcourse}=require("../controller/Coursecontroller")
route.post("/addcourse",createcourse)
route.get("/getcourse",getcourse)
route.get("/coursesearch",searchcourse)
route.put("/updatecourse/:id",updatecourse)
route.delete("/deletecourse/:id",deletecourse)
module.exports=route