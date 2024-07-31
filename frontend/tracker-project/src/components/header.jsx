import React from 'react';
import { Link } from 'react-router-dom';


export default function header() {
  return (
    <div>
       <div classname ="Header">

         <nav>
           <Link to="/">Home</Link>
           <Link to="/add-student">Add Student</Link>
         </nav>
      </div>
    </div>
  );
};


