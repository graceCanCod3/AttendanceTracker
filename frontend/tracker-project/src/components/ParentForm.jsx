import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'
import './ParentForm.css'

const ParentForm = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')

    const [loading, setLoading] = useState(false)
    const [parents, setParents] = useState([])

    useEffect(() => {
        const renderData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/parentcontacts/')
                setParents(response.data)
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setLoading(false)
            }
        }
        renderData();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            if (firstName && lastName && phone && email && address) {
                const newParent = {
                    first_name: firstName,
                    last_name: lastName,
                    phone,
                    email,
                    address,
                };
                const parentResponse = await axios.post('http://127.0.0.1:8000/api/parentcontacts/', newParent)
                console.log('New Parent created:', parentResponse.data)
                // Clear form fields after successful submission
                setFirstName('')
                setLastName('')
                setPhone('')
                setEmail('')
                setAddress('')
            }
        } catch (error) {
            console.error('Error creating record:', error)
        }
    }

    if (loading) {
        return <div className="loading">Loading...</div>
    }

    return (
        <div className="parent-form-container">
            <h1>Create Parent</h1>
            <form onSubmit={handleSubmit} className="parent-form">
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" required />
                </div>
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    );
}

export default ParentForm
