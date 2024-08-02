// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const StudentForm = () => {
//   const { id } = useParams();
//   const [student, setStudent] = useState({
//     first_name: '',
//     last_name: '',
//     date_of_birth: '',
//     gender: '',
//     grade: '',
//     parent_contact: null,
//   });
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (id) {
//       fetchStudent();
//     }
//   }, [id]);

//   const fetchStudent = async () => {
//     try {
//       const response = await axios.get(`http://127.0.0.1:8000/api/students/`);
//       setStudent(response.data);
//     } catch (error) {
//       console.error('Error fetching student:', error);
//     }
//   };



//   const handleChange = (e) => {
//     setStudent({ ...student, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (id) {
//         await axios.put(`http://127.0.0.1:8000/api/students/${id}/`, student);
//       } else {
//         await axios.post('http://127.0.0.1:8000/api/students/', student);
//       }
//       navigate('/');
//     } catch (error) {
//       console.error('Error saving student:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>{id ? 'Edit Student' : 'Add Student'}</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="first_name"
//           value={student.first_name}
//           onChange={handleChange}
//           placeholder="First Name"
//         />
//         <input
//           type="text"
//           name="last_name"
//           value={student.last_name}
//           onChange={handleChange}
//           placeholder="Last Name"
//         />
//         <input
//           type="date"
//           name="date_of_birth"
//           value={student.date_of_birth}
//           onChange={handleChange}
//           placeholder="Date of Birth"
//         />
//         <input
//           type="text"
//           name="gender"
//           value={student.gender}
//           onChange={handleChange}
//           placeholder="Gender"
//         />
//         <input
//           type="text"
//           name="grade"
//           value={student.grade}
//           onChange={handleChange}
//           placeholder="Grade"
//         />
//         <button type="submit">Save</button>
//       </form>
//     </div>
//   );
// };

// export default StudentForm;


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
       {/* <input type="text" value={parentContact} onChange={(e) => setParentContact(e.target.value)} placeholder="Parent Contact" /> */}
      <button type="submit">Submit</button>
    </form>
  </div>
  );
}
  export default StudentForm
