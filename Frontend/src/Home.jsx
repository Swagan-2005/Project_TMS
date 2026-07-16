import axios from 'axios';
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useEffect,useState } from "react";
import * as bootstrap from "bootstrap";
import './Home.css';
function Home() {
  const [tcount,settcount]=useState(0)
  const [ccount,setccount]=useState(0)
  const [scount,setscount]=useState(0)
    useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );

    tooltipTriggerList.forEach((el) => {
      new bootstrap.Tooltip(el);
    });
    const datacount=async()=>{
          let datas=await axios.get("http://localhost/3000/api/trainerget");
          settcount(datas.data.length)
    }
    const coursecount=async()=>{
      let datas=await axios.get("http://localhost/3000/api/getcourse");
      setccount(datas.data.length)
    }
    const studentcount=async()=>{
      let datas=await axios.get("http://localhost/3000/api/getstudent");
      setscount(datas.data.length)
    }
    datacount();
    coursecount();
    studentcount();

  }, []);
    return (
          <div class="container-fluid  bg-secondary">
            <div class="row">
              <div class="col-3 bg-light vh-100">
                  <h1 class="text-seconadry">DashBoard</h1>
                  <div class="d-flex flex-column gap-5 mt-4">

            <Link class="btn btn-outline-secondary border-0 btn-lg rounded-pill my-3 mx-2 p-2" to="/" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Home" data-bs-custom-class="my-tooltip"><i class="bi bi-house fs-4"></i></Link>
            <Link class="btn btn-outline-secondary btn-lg border-0 rounded-pill my-3 p-2" to="/trainer">Trainer</Link>
            <Link class="btn btn-outline-secondary border-0 btn-lg rounded-pill my-3 p-2" to="/student">Student</Link>
            <Link class="btn btn-outline-secondary border-0 btn-lg rounded-pill my-3 p-2" to="/course">Course</Link>

                  </div> 
            </div>
              <div class="col-9">
                <div class="row g-4 mt-2">
                    <div class="col-6 d-flex justify-content-center">
                        <div class="card" style={{width: "18rem"}}>
                          <img src={"https://tse4.mm.bing.net/th/id/OIP.xAKBu8y5PMdumLTTr4JTwgHaE7?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"} class="card-img-top " style={{ height: "200px", objectFit: "cover" }} alt="Trainer"/>
                          <div class="card-body">
                              <h5 class="card-title text-center">Trainer</h5>
                              <p class="card-text">Total Number of Trainers:{tcount} </p>
                          </div>
                        </div>
                    </div>
          
                    <div class="col-6 d-flex justify-content-center">
                        <div class="card" style={{width: "18rem"}}>
                              <img src={"https://thumbs.dreamstime.com/b/three-students-studying-laptops-surrounded-books-plants-346792640.jpg"} class="card-img-top " style={{ height: "200px", objectFit: "cover" }} alt="Trainer"/>
                              <div class="card-body">
                                  <h5 class="card-title text-center">Student</h5>
                                  <p class="card-text">Total Number of Students:{scount}</p>
                              </div>
                        </div>
                    </div>
                </div>
                              <div class="row g-4 mt-2 justify-content-center">
                    <div class="col-6 d-flex justify-content-center">
                        <div class="card" style={{width: "18rem"}}>
                            <img src={"https://digitallearning.eletsonline.com/wp-content/uploads/2019/03/Online-courses.jpg"} class="card-img-top " style={{ height: "200px", objectFit: "cover" }} alt="Trainer"/>
                            <div class="card-body">
                                <h5 class="card-title text-center">Course</h5>
                                <p class="card-text">Total Number of Courses:{ccount} </p>
                            </div>
                        </div>
                    </div>
              </div>
              </div>

          </div>
          </div>
  
        

      
    )
}
export default Home