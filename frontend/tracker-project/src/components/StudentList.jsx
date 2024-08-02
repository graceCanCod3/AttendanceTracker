import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const StudentList = ({user, setUser}) => {
  const [students, setStudents] = useState([])

  const getUser = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/customuser')
        console.log('response: ', response.data);
        setUser(response.data)
    } catch (error) {
        console.error('Error fetching user data:', error)
    }
};
    useEffect(() => {
      getUser()
}, [])

  useEffect(() => {
      const getAllStudents = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/students')
          setStudents(response.data)
        } catch (error) {
          console.error('Error fetching students:', error)
        }
      }
      
      getAllStudents()
    }, [])

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/students/${id}`)
      getAllStudents()
    } catch (error) {
      console.error('Error deleting student:', error)
    }
  };

  return (
    <div className='students'>
      <h1>Students</h1>
      <h2>Nice to have you back {user.username}</h2>
      {/* <Link to="/add-student">Add Student</Link> */}
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            <Link to={`/students/${student.id}`}>{student.first_name} {student.last_name}</Link>
            <button onClick={() => deleteStudent(student.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList
