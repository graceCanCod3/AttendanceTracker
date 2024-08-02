import React from 'react';
import { Link } from 'react-router-dom';


export default function header() {
  return (
    <div>
       <div className ="Header">

         <nav>
           <Link to="/">Home</Link>
           <Link to="/add-student">Add Student</Link>
           <Link to="/login">Login</Link>
         </nav>
      </div>
    </div>
  );
};


