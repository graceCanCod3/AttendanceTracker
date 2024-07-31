import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentForm = () => {
  const { id } = useParams();
  const [student, setStudent] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: '',
    grade: '',
    parent_contact: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchStudent();
    }
  }, []);

  const fetchStudent = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/students/${id}/`);
      setStudent(response.data);
    } catch (error) {
      console.error('Error fetching student:', error);
    }
  };

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://127.0.0.1:8000/api/students/${id}/`, student);
      } else {
        await axios.post('http://127.0.0.1:8000/api/students/', student);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  return (
    <div>
      <h1>{id ? 'Edit Student' : 'Add Student'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          value={student.first_name}
          onChange={handleChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="last_name"
          value={student.last_name}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <input
          type="date"
          name="date_of_birth"
          value={student.date_of_birth}
          onChange={handleChange}
          placeholder="Date of Birth"
        />
        <input
          type="text"
          name="gender"
          value={student.gender}
          onChange={handleChange}
          placeholder="Gender"
        />
        <input
          type="text"
          name="grade"
          value={student.grade}
          onChange={handleChange}
          placeholder="Grade"
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default StudentForm;
