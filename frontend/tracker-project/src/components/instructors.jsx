import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Instructors() {
    const [instructors, setInstructors] = useState([])

    useEffect(() => {
        const getAllInstructors = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/instructors/')
                setInstructors(response.data)
            } catch (error) {
                console.error('Error getting instructors:', error)
            }
        }

        getAllInstructors()
    }, [])

    return (
        <div>
            <h1>Instructors</h1>
            <ul>
                {instructors.map(instructor => (
                    <li key={instructor.id}>
                        <Link to={`/instructors/${instructor.id}`}>
                            {instructor.first_name} {instructor.last_name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
