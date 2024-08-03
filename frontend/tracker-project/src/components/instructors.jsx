import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Instructors.css'

export default function Instructors() {
    const [instructors, setInstructors] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getAllInstructors = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/instructors/')
                setInstructors(response.data)
            } catch (error) {
                console.error('Error getting instructors:', error)
            } finally {
                setLoading(false)
            }
        }

        getAllInstructors()
    }, [])

    if (loading) {
        return <div className="loading">Loading...</div>
    }

    return (
        <div className="instructors-container">
            <h1>Instructors</h1>
            <ul className="instructors-list">
                {instructors.map(instructor => (
                    <li key={instructor.id} className="instructor-item">
                        <Link to={`/instructors/${instructor.id}`} className="instructor-link">
                            {instructor.first_name} {instructor.last_name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
