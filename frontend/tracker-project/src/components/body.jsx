import { Route, Routes } from 'react-router-dom'
import StudentList from './StudentList'
import StudentDetail from './StudentDetail'
import StudentForm from './StudentForm'
import ClassSession from './classSession'
import Login from './login'
import { useState } from 'react'


export default function body () {

    const [user, setUser] = useState({username: '' })

  return (
    <div>

     <Routes>
          <Route exact path="/" element={<StudentList user={user} setUser={setUser}/>} />
          <Route path="/classsessions/" element={<ClassSession/>} />
          <Route path="/students/:id" element={<StudentDetail/>} />
          <Route path="/add-student" element={<StudentForm/>} />
          <Route path="/edit-student/:id" element={<StudentForm/>} />
          <Route path="/login" element={<Login/>} />
     </Routes>

    </div>
  )
}


