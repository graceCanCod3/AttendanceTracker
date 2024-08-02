import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

const parentContact = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const [parent, setParent] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: ''
    });
    const [updated, setUpdated] = useState(false)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const parentDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/parentcontacts/${id}/`)
                setParent(response.data)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching parent data:', error)
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
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setParent(prevParent => ({
            ...prevParent,
            [name]: value
        }));
    };


    useEffect(() => {
        if (updated) {
            navigate('/');
        }
    }, [updated, navigate]);

    if (loading) {
        return <div>Loading...</div>
    }
return (
        <div>
        <h1>Edit Parent</h1>
        <form onSubmit={handleSubmit}>
            <label>First Name:</label>
            <input type="text" name="name" value={parent.firstName} onChange={handleChange} required />
            <label>Last Name:</label>
            <input type="text" name="genre" value={parent.lastName} onChange={handleChange} />
            <label>Phone:</label>
            <input type="text" name="members" value={parent.phone} onChange={handleChange} />
            <label>Email:</label>
            <input type="email" value={parent.email} onChange={handleChange} />
            <label>Address:</label>
            <input type="text" value={parent.address} onChange={handleChange} />
            <button type="submit">Update</button>
        </form>
    </div>
)
}

export default parentContact