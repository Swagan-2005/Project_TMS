import React from 'react';
import Home from './Home';
import Trainer from './Trainer';
import Student from './Student';
import Course from './Course';
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom'



function App(){


 return(
        <BrowserRouter>
        <Routes>
            <Route element={<Home/>} path="/"></Route>
            <Route element={<Trainer/>} path="/trainer"></Route>
            <Route element={<Student/>} path="/student"></Route>
            <Route element={<Course/>} path="/course"></Route>
        </Routes>
        </BrowserRouter>
       
 )
 }
export default App