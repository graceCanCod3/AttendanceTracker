import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function InstructorDetail() {
    const { id } = useParams()
    const [instructor, setInstructor] = useState(null)

    useEffect(() => {
        const getInstructor = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/instructors/${id}/`)
                setInstructor(response.data)
            } catch (error) {
                console.error('Error locating instructor:', error)
            }
        }

        getInstructor()
    }, [id])

    if (!instructor) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>{instructor.first_name} {instructor.last_name}</h1>
            <p>Email: {instructor.email}</p>
            <p>Phone: {instructor.phone}</p>
        </div>
    )
}
