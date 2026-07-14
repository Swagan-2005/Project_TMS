import axios from 'axios';
import React,{useState,useEffect} from 'react';
import {useForm} from 'react-hook-form';
import './Course.css';

function Course(){
    const[coursedata,setcoursedata]=useState([]);
    const[title,settitle]=useState(" ");
    const[buttonname,setbuttonname]=useState(" ");
    const[id,setid]=useState(" ");
    const {register,handleSubmit,reset,formState:{errors}}=useForm();
    const[search,setsearch]=useState(" ");
    const[message,setmessage]=useState(" ");
    const adddata=()=>{
        setmessage(" ")
        settitle("Add Course Form");
        setbuttonname("Save Course");
        reset({
            name:"",
            duration:"",
            fees:"",
            description:"",
            status:""
        });
        
    }

    const onsubmit=async(data)=>{
        if(title=="Add Course Form"){
        let newcourse=await axios.post("http://localhost:3000/api/addcourse",data)
   
        handleget();
        }
        else{
            let updatecourse=await axios.put("http://localhost:3000/api/updatecourse/"+id,data)
      
            handleget();
        }

    }
    const handleget=async()=>{
        let datas=await axios.get("http://localhost:3000/api/getcourse");
        setcoursedata(datas.data);
        if(datas.data.length==0){
            setmessage("No Course Data");
        }
        else{
            setmessage(" ");
        }
        
        
    }
    const editdata=async(d)=>{
        settitle("Edit Course Form");
        setbuttonname("Edit Course");
        setid(d._id);
        reset({
            name:d.name,
            duration:d.duration,
            fees:d.fees,
            description:d.description,
            status:d.status
        });
        
        
    }
    const deletedata=async()=>{
        
        let del=await axios.delete("http://localhost:3000/api/deletecourse/"+id);
        handleget();
  
    }
    const deleteconfirm=(d)=>{
        setid(d._id);
    }

    const handlesearch=(e)=>{
        setsearch(e.target.value)
        
        

    }
    const searchdata=async()=>{
        setmessage("")
        if(search.length!=0){
         
            let val=await axios.get(`http://localhost:3000/api/coursesearch?name=${search}`)


            if(val.data!="Not Found"){
                    setcoursedata(val.data)
            }
            else{
                setmessage(val.data)
            }
        }
        else{
            handleget()
        }

        }






    
    useEffect(()=>{
        handleget();
    },[])
    return(
        <div class="container-fluid bg-secondary d-flex justify-content-center align-items-center w-100 vh-100">
            
            <div class="container bg-light text-center" style={{width:"1200 px",height:"700px"}}>
                <h1>Courses</h1>
                <button class="btn btn-outline-secondary p-3 m-3 w-25 " data-bs-toggle="modal" data-bs-target="#addform" onClick={adddata}>+Add Course</button><br></br>
                <input type="text" placeholder="Search" class="search" onChange={handlesearch} ></input>
                <button class="btn btn-outline-secondary p-2 m-2 w-25" onClick={searchdata}>Search</button>
                {message=="Not Found" || message=="No Course Data"?(<div><h2>{message}</h2></div>):
                (<table class="table table-bordered border-dark p-1">
                <thead>
                    <tr>
                        <th>Course Name</th>
                        <th>Duration</th>
                        <th>Fees</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                
                <tbody>
                    {coursedata.map((da)=>(
                        <tr>
                            <td>{da.name}</td>
                            <td>{da.duration}</td>
                            <td>{da.fees}</td>
                            <td>{da.description}</td>
                            <td>{da.status}</td>
                            <td class="action">
                            <button class="btn btn-outline-secondary p-2 m-2 w-25" data-bs-toggle="modal" data-bs-target="#addform" onClick={()=>{editdata(da)
                            }} >Edit</button>
                            <button class="btn btn-outline-secondary p-2 m-2 w-25" data-bs-toggle="modal" data-bs-target="#deletedata" onClick={()=>{deleteconfirm(da)}}>delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                </table>)}
            </div>

        <div class="modal fade" id="deletedata" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog  modal-dialog-centered">
        <div class="modal-content">
                    <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Are You Sure?</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={deletedata}>Delete</button>
            </div>
        </div>
        </div>
        </div>

        <div class="modal fade" id="addform" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                    <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">{title}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
            <form onSubmit={handleSubmit(onsubmit)}>
            <div class="modal-body text-center">
            
            <input type="text" placeholder="Course Name"  {...register("name",{required:{
                value:true,
                message:"Name is required!"
            }})}></input>
            <p>{errors.name?.message}</p>
            <input type="text" placeholder="Duration"{...register("duration",{required:{
                value:true,
                message:"Duration is required!"
            }})}></input>
            <p>{errors.duration?.message}</p>
            <input type="Number" placeholder="Fees"  {...register("fees",{required:{
                value:true,
                message:"Fees is required!"
            }})}></input>
            <p>{errors.fees?.message}</p>
            <input type="text" placeholder="Description"  {...register("description",{required:{
                value:true,
                message:"Description is required!"
            }})}></input>
            <p>{errors.description?.message}</p>
            <input type="text" placeholder="Status"  {...register("status",{required:{
                value:true,
                message:"Status is required!"
            }})}></input><br></br>
            <p>{errors.status?.message}</p>
            </div>
            <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary" >{buttonname}</button>
            </div>
            </form>

        
        </div>
        </div>
        </div>
    </div>

    )
}
export default Course