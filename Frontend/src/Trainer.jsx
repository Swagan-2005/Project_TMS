import axios from 'axios';
import React,{useState,useEffect} from 'react';
import {useForm} from 'react-hook-form';
import './Trainer.css';

function Trainer(){
    const[trainerdata,settrainerdata]=useState([]);
    const[title,settitle]=useState(" ");
    const[buttonname,setbuttonname]=useState(" ");
    const[id,setid]=useState(" ");
    const {register,handleSubmit,reset,formState:{errors}}=useForm();
    const[search,setsearch]=useState(" ");
    const[message,setmessage]=useState(" ");
    const adddata=()=>{
        settitle("Add Trainer Form");
        setbuttonname("Save Trainer");
        reset({
            name:"",
            email:"",
            phone:"",
            specialization:"",
            experience:"",
            status:""
        });
        setmessage("");
        
    }

    const onsubmit=async(data)=>{
        if(title=="Add Trainer Form"){
        let newtrainer=await axios.post("http://localhost/3000/api/trainercreate",data)
   
        handleget();
        }
        else{
            let updatetrainer=await axios.put("http://localhost/3000/api/trainerput/"+id,data)
      
            handleget();
        }

    }
    const handleget=async()=>{
        let datas=await axios.get("http://localhost/3000/api/trainerget");
        settrainerdata(datas.data);
        if(datas.data.length==0){
            setmessage("No Trainer Data")
        }
        else{
            
            setmessage("");
        }
        
        
    }
    const editdata=async(d)=>{
        settitle("Edit Trainer Form");
        setbuttonname("Edit Trainer");
        setid(d._id);
        reset({
            name:d.name,
            email:d.email,
            phone:d.phone,
            specialization:d.specialization,
            experience:d.experience,
            status:d.status
        });
        
        
    }
    const deletedata=async()=>{
        
        let del=await axios.delete("http://localhost/3000/api/trainerdelete/"+id);
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
         
            let val=await axios.get(`http://localhost/3000/api/trainersearch?name=${search}`)


            if(val.data!="Not Found"){
                    settrainerdata(val.data)
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
                <h1>Trainers</h1>
                <button class="btn btn-outline-secondary p-3 m-3 w-25 " data-bs-toggle="modal" data-bs-target="#addform" onClick={adddata}>+Add Trainer</button><br></br>
                <input type="text" placeholder="Search" class="search" onChange={handlesearch} ></input>
                <button class="btn btn-outline-secondary p-2 m-2 w-25" onClick={searchdata}>Search</button>
                {message=="Not Found" || message=="No Trainer Data"?(<div><h2 >{message}</h2></div>):
                (<table class="table table-bordered border-dark p-1">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Specialization</th>
                        <th>Experience</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                
                <tbody>
                    {trainerdata.map((da)=>(
                        <tr>
                            <td>{da.name}</td>
                            <td>{da.email}</td>
                            <td>{da.phone}</td>
                            <td>{da.specialization}</td>
                            <td>{da.experience}</td>
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
            
            <input type="text" placeholder="Trainer Name"  {...register("name",{required:{
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
            <input type="text" placeholder="Specialization"  {...register("specialization",{required:{
                value:true,
                message:"Specialization is required!"
            }})}></input>
            <p>{errors.specialization?.message}</p>
            <input type="Number" placeholder="Experience"  {...register("experience",{required:{
                value:true,
                message:"Experience is required!"
            }})}></input>
            <p>{errors.experience?.message}</p>
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
export default Trainer