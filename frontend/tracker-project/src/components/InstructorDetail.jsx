import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import './InstructorDetail.css'

export default function InstructorDetail() {
    const { id } = useParams()
    const [instructor, setInstructor] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getInstructor = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/instructors/${id}/`)
                setInstructor(response.data)
            } catch (error) {
                console.error('Error locating instructor:', error)
            } finally {
                setLoading(false)
            }
        }

        getInstructor()
    }, [id])

    if (loading) {
        return <div className="loading">Loading...</div>
    }

    if (!instructor) {
        return <div className="loading">Instructor not found</div>
    }

    return (
        <div className="instructor-detail">
            <h1>{instructor.first_name} {instructor.last_name}</h1>
            <div className="instructor-info">
                <p><strong>Email:</strong> {instructor.email}</p>
                <p><strong>Phone:</strong> {instructor.phone}</p>
            </div>
        </div>
    )
}

