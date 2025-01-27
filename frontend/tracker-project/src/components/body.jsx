import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import StudentList from './StudentList'
import StudentDetail from './StudentDetail'
import StudentForm from './StudentForm'
import ClassSession from './classSession'
import Login from './login'
import ParentForm from './ParentForm'
import ParentContact from './parentContact'
import ParentList from './ParentList'
import Instructors from './instructors'
import InstructorDetail from './InstructorDetail'
import './Body.css'

export default function Body() {
  const [user, setUser] = useState({ username: '' })

  return (
    <div className="body-content">
      <Routes>
        <Route exact path="/" element={<StudentList user={user} setUser={setUser} />} />
        <Route path="/instructors" element={<Instructors />} />
        <Route path="/instructors/:id" element={<InstructorDetail />} />
        <Route path="/classsessions/" element={<ClassSession />} />
        <Route path="/students/:id" element={<StudentDetail />} />
        <Route path="/parentcontacts/:id" element={<ParentList />} />
        <Route path="/parentcontacts/:id/update" element={<ParentContact />} />
        <Route path="/add-student" element={<StudentForm />} />
        <Route path="/edit-student/:id" element={<StudentForm />} />
        <Route path="/add-parent/" element={<ParentForm />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}



