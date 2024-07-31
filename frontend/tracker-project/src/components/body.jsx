import { Route, Routes } from 'react-router-dom'
import StudentList from './StudentList'
import StudentDetail from './StudentDetail'
import StudentForm from './StudentForm'


export default function body () {
  return (
    <div>

     <Routes>
          <Route exact path="/" component={StudentList} />
          <Route path="/students/:id" component={StudentDetail} />
          <Route path="/add-student" component={StudentForm} />
          <Route path="/edit-student/:id" component={StudentForm} />
     </Routes>

    </div>
  )
}


