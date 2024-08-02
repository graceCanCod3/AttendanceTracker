

import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const StudentForm = () => {
const [firstName, setfirstName] = useState('')
const [lastName, setLastName] = useState('')
const [dob, setDOB] = useState('')
const [gender, setGender] = useState('')
const [grade, setGrade] = useState('')
const [parentContact, setParentContact] = useState('')
const [parents, setParents] = useState([])

const [loading, setLoading] = useState(false)
const [students, setStudents] = useState([])

useEffect(() => {
const renderData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/students')
      setStudents(response.data);
      const parentsResponse = await axios.get('http://127.0.0.1:8000/api/parentcontacts')
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
          last_name:lastName,
          date_of_birth: dob,
          gender,
          grade,
          parent_contact: parentContact,
        };
        const studentResponse = await axios.post('http://127.0.0.1:8000/api/students/', newStudent)
        console.log('New Students created:', studentResponse.data)
        }
    } catch (error) {
        console.error('Error creating record:', error)
      }
    };

    if (loading) {
        return <div>Loading...</div>
      }


return (
  <div>
  <h1>Create Form</h1>
      <form onSubmit={handleSubmit}>
      <h2>New Student</h2>
      First Name: <input type="text" value={firstName} onChange={(e) => setfirstName(e.target.value)} placeholder="First Name" />
      Last Name: <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
      DOB: <input type="date" value={dob} onChange={(e) => setDOB(e.target.value)} placeholder="DOB" />
      Gender: <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} placeholder="Gender" />
      Grade: <input type="text" value={grade} onChange={(e) => setGrade(e.target.value)} placeholder="Grade" />
      Parent Contact:
      <select value={parentContact} onChange={(e) => setParentContact(e.target.value)}>
        <option value="">Select Parent</option>
        {parents.map((parent) => (
          <option key={parent.id} value={parent.id}>
            {parent.phone}
          </option>
        ))}
        </select>
      <button type="submit">Submit</button>
    </form>
  </div>
  );
}
  export default StudentForm
