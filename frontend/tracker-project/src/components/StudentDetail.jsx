import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const StudentDetail = () => {
  const { id } = useParams()
  const [student, setStudent] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    getStudent()
  }, []);

  const getStudent = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/students/${id}`)
      setStudent(response.data)
    } catch (error) {
      console.error('Error getting student:', error)
    }
  }

  const deleteStudent = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/students/${id}`)
      navigate('/');
    } catch (error) {
      console.error('Error deleting student:', error)
    }
  }

  if (!student) return <div>Loading...</div>

  return (
    <div>
      <h1>{student.first_name} {student.last_name}</h1>
      <p>Gender: {student.gender}</p>
      <p>Date of Birth: {student.date_of_birth}</p>
      <p>Grade: {student.grade}</p>
      <button onClick={deleteStudent}>Delete</button>
      <button onClick={() => navigate(`/edit-student/${id}`)}>Edit</button>
    </div>
  )
}

export default StudentDetail
