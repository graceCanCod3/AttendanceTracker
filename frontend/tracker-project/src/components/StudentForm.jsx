import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './StudentForm.css'

const StudentForm = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dob, setDOB] = useState('')
  const [gender, setGender] = useState('')
  const [grade, setGrade] = useState('')
  const [parentContact, setParentContact] = useState('')
  const [parents, setParents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const renderData = async () => {
      try {
        const [studentsResponse, parentsResponse] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/students'),
          axios.get('http://127.0.0.1:8000/api/parentcontacts')
        ]);
        setParents(parentsResponse.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false)
      }
    }
    renderData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (firstName && lastName && dob && gender && grade && parentContact) {
        const newStudent = {
          first_name: firstName,
          last_name: lastName,
          date_of_birth: dob,
          gender,
          grade,
          parent_contact: parentContact,
        };
        const studentResponse = await axios.post('http://127.0.0.1:8000/api/students/', newStudent)
        console.log('New Student created:', studentResponse.data)
        // Clear form fields after successful submission
        setFirstName('')
        setLastName('')
        setDOB('')
        setGender('')
        setGrade('')
        setParentContact('')
      }
    } catch (error) {
      console.error('Error creating record:', error)
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="student-form-container">
      <h1>Create Student</h1>
      <form onSubmit={handleSubmit} className="student-form">
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" required />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" required />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth:</label>
          <input type="date" id="dob" value={dob} onChange={(e) => setDOB(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <input type="text" id="gender" value={gender} onChange={(e) => setGender(e.target.value)} placeholder="Gender" required />
        </div>
        <div className="form-group">
          <label htmlFor="grade">Grade:</label>
          <input type="text" id="grade" value={grade} onChange={(e) => setGrade(e.target.value)} placeholder="Grade" required />
        </div>
        <div className="form-group">
          <label htmlFor="parentContact">Parent Contact:</label>
          <select id="parentContact" value={parentContact} onChange={(e) => setParentContact(e.target.value)} required>
            <option value="">Select Parent</option>
            {parents.map((parent) => (
              <option key={parent.id} value={parent.id}>
                {parent.phone}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default StudentForm
