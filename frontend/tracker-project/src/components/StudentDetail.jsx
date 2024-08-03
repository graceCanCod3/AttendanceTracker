import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './StudentDetail.css'

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

  if (!student) return <div className="loading">Loading...</div>

  return (
    <div className="student-detail">
      <h1>{student.first_name} {student.last_name}</h1>
      <div className="student-info">
        <p><strong>Gender:</strong> {student.gender}</p>
        <p><strong>Date of Birth:</strong> {student.date_of_birth}</p>
        <p><strong>Grade:</strong> {student.grade}</p>
      </div>
      <div className="button-group">
        <button className="button delete-button" onClick={deleteStudent}>Delete</button>
        <button className="button edit-button" onClick={() => navigate(`/edit-student/${id}`)}>Edit</button>
      </div>
    </div>
  )
}

export default StudentDetail

