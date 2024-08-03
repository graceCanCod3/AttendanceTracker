import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './StudentList.css'

// import Carousel from 'react-bootstrap/Carousel'


const StudentList = ({user, setUser}) => {
  const [students, setStudents] = useState([])

  const getUser = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/students/')
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
      <h1>Enrolled Students</h1>
      <h2>{user.username}</h2>
      <ul className="student-list">
        {students.map((student) => (
          <li key={student.id} className="student-item">
            <Link to={`/students/${student.id}`} className="student-link">
              {student.first_name} {student.last_name}
            </Link>

          </li>
        ))}
      </ul>
    </div>
    
  );
  
};

export default StudentList
