import React from 'react'
import { Link, useParams } from 'react-router-dom'



export default function header() {
  return (
    <div>
       <div className ="Header">

         <nav>
           <Link to="/">Home</Link>
           <Link to="/parentcontacts/:ids">Parent Contact</Link>
           {/* <Link to={`/parentcontacts/${id}/update`}>Update Parent</Link> */}
           <Link to="/add-student">Add Student</Link>
           <Link to="/login">Login</Link>
           <Link to="/add-parent">Add Parent</Link>
         </nav>
      </div>
    </div>
  );
};


