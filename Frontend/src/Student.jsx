import axios from 'axios';
import React,{useState,useEffect} from 'react';
import {useForm} from 'react-hook-form';
import './Student.css';

function Student(){
   
    const[studentdata,setstudentdata]=useState([]);
    const[title,settitle]=useState(" ");
    const[buttonname,setbuttonname]=useState(" ");
    const[id,setid]=useState(" ");
    const {register,handleSubmit,reset,formState:{errors},watch}=useForm();
    const[search,setsearch]=useState(" ");
    const[message,setmessage]=useState(" ");
    const[trainers,settrainers]=useState([]);
    const[courses,setcourses]=useState([]);
    const adddata=()=>{
        setmessage(" ")
        settitle("Add Student Form");
        setbuttonname("Save Student");
        reset({
            name:"",
            email:"",
            phone:"",
            course:"",
            trainer:"",
            joiningdate:"",
            status:""
        });
        
    }

    const onsubmit=async(data)=>{
        if(title=="Add Student Form"){
        let newstudent=await axios.post("http://localhost:3000/api/addstudent",data)
   
        handleget();
        }
        else{
            let updatestudent=await axios.put("http://localhost:3000/api/updatestudent/"+id,data)
      
            handleget();
        }

    }
    const handleget=async()=>{
        let datas=await axios.get("http://localhost:3000//api/getstudent");
        setstudentdata(datas.data);
        if(datas.data.length==0){
            setmessage("No Student Data")
        }
        else{
            setmessage(" ")
        }
        
        
    }
    const editdata=async(d)=>{
        settitle("Edit Student Form");
        setbuttonname("Edit Student");
        setid(d._id);
        reset({
            name:d.name,
            email:d.email,
            phone:d.phone,
            course:d.course,
            trainer:d.trainer,
            joiningdate:d.joiningdate,
            status:d.status
        });
        
        
    }
    const deletedata=async()=>{
        
        let del=await axios.delete("http://localhost:3000/api/deletestudent/"+id);
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
         
            let val=await axios.get(`http://localhost:3000/api/searchstudent?name=${search}`)


            if(val.data!="Not Found"){
                    setstudentdata(val.data)
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
        const trainerlist=async()=>{
            let datas=await axios.get("http://localhost:3000/api/trainerget");
            settrainers(datas.data)

        }
        const courselist=async()=>{
            let datas=await axios.get("http://localhost:3000/api/getcourse");
            setcourses(datas.data)
        }
        trainerlist();
        courselist();
    },[])
    return(
        <div class="container-fluid bg-secondary d-flex justify-content-center align-items-center w-100 vh-100">
            
            <div class="container bg-light text-center" style={{width:"1200 px",height:"700px"}}>
                <h1>Students</h1>
                <button class="btn btn-outline-secondary p-3 m-3 w-25 " data-bs-toggle="modal" data-bs-target="#addform" onClick={adddata}>+Add Student</button><br></br>
                <input type="text" placeholder="Search" class="search" onChange={handlesearch} ></input>
                <button class="btn btn-outline-secondary p-2 m-2 w-25" onClick={searchdata}>Search</button>
                {message=="Not Found" || message=="No Student Data"?(<div><h2>{message}</h2></div>):
                (<table class="table table-bordered border-dark p-1">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Course</th>
                        <th>Trainer</th>
                        <th>Joining Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                
                <tbody>
                    {studentdata.map((da)=>(
                        <tr>
                            <td>{da.name}</td>
                            <td>{da.email}</td>
                            <td>{da.phone}</td>
                            <td>{da.course}</td>
                            <td>{da.trainer}</td>
                            <td>{da.joiningdate}</td>
                            <td>{da.status}</td>
                            <td class="action">
                            <button class="btn btn-outline-secondary p-2 m-2 w-30" data-bs-toggle="modal" data-bs-target="#addform" onClick={()=>{editdata(da)
                            }} >Edit</button>
                            <button class="btn btn-outline-secondary p-2 m-2 w-30" data-bs-toggle="modal" data-bs-target="#deletedata" onClick={()=>{deleteconfirm(da)}}>delete</button>
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
            
            <input type="text" placeholder="Student Name"  {...register("name",{required:{
                value:true,
                message:"Name is required!"
            }})}></input>
            <p>{errors.name?.message}</p>
            <input type="email" placeholder="Email"{...register("email",{required:{
                value:true,
                message:"Email is required!"
            }})}></input>
            <p>{errors.email?.message}</p>
            <input type="tel" placeholder="Phonenumber"  {...register("phone",{required:{
                value:true,
                message:"Phone Number is required!"
            }})}></input>
            <p>{errors.phone?.message}</p>
            <select  {...register("course",{required:{
                value:true,
                message:"Course is required!"
            }})}>
            <option value="">Select Course</option>
            {courses.map((da)=>(
                <option value={da.name}>{da.name}</option>
            ))}
            </select>
            <p>{errors.course?.message}</p>
            <select {...register("trainer",{required:{
                value:true,
                message:"Trainer is required!"
            }})}>
            <option value="">Select Trainer</option>
            {trainers.map((d)=>(
                d.specialization==watch("course")?
                (<option value={d.name}>{d.name}</option>):null
                
            ))}
            </select>
            <p>{errors.trainer?.message}</p>
            <input type="text" placeholder="Joining Date"  {...register("joiningdate",{required:{
                value:true,
                message:"Joining Date is required!"
            }})}></input><br></br>
            <p>{errors.joiningdate?.message}</p>
            <input type="text" placeholder="Status"  {...register("status",{required:{
                value:true,
                message:"Status is required!"
            }})}></input><br></br>
            <p>{errors.status?.message}</p>
            </div>
            <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">{buttonname}</button>
            </div>
            </form>

        
        </div>
        </div>
        </div>
    </div>
    )
    
}
export default Student