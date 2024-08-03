import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import './ParentContact.css'

const ParentContact = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [parent, setParent] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        address: ''
    })
    const [updated, setUpdated] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const parentDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/parentcontacts/${id}/`)
                setParent(response.data)
                setLoading(false)
            } catch (error) {
                console.error('Error getting parent data:', error)
            }
        }
        parentDetails()
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/parentcontacts/${id}/`, parent)
            console.log('Parent updated', response.data)
            setUpdated(true);
        } catch (error) {
            console.error('Error updating parent:', error)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setParent(prevParent => ({
            ...prevParent,
            [name]: value
        }));
    };

    useEffect(() => {
        if (updated) {
            navigate('/')
        }
    }, [updated, navigate])

    if (loading) {
        return <div className="loading">Loading...</div>
    }

    return (
        <div className="content-wrapper">
            <h1 className="page-title">Edit Parent</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="first_name">First Name:</label>
                    <input type="text" id="first_name" name="first_name" value={parent.first_name} onChange={handleChange} required />
                </div>
                
                <div className="form-group">
                    <label htmlFor="last_name">Last Name:</label>
                    <input type="text" id="last_name" name="last_name" value={parent.last_name} onChange={handleChange} required />
                </div>
                
                <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input type="tel" id="phone" name="phone" value={parent.phone} onChange={handleChange} required />
                </div>
                
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={parent.email} onChange={handleChange} required />
                </div>
                
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input type="text" id="address" name="address" value={parent.address} onChange={handleChange} required />
                </div>
                
                <button type="submit">Update</button>
            </form>
        </div>
    )
}

export default ParentContact
