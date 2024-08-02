import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'

const ParentForm = () => {

    const [firstName, setfirstName] = useState('')
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
              last_name:lastName,
              phone,
              email,
              address,
          };
        const parentResponse = await axios.post('http://127.0.0.1:8000/api/parentcontacts/', newParent)
        console.log('New Parent created:', parentResponse.data)
        }
    } catch (error) {
        console.error('Error creating record:', error)
      }
    }

    if (loading) {
        return <div>Loading...</div>
      }


         return (
             <div>
                <h1>Create Form</h1>
                  <form onSubmit={handleSubmit}>
                  <h2>New Parent</h2>
                   First Name: <input type="text" value={firstName} onChange={(e) => setfirstName(e.target.value)} placeholder="First Name" />
                   Last Name: <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
                   Phone: <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
                   Email: <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                   Address: <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
                  <button type="submit">Submit</button>
                 </form>
             </div>
    );
}
    export default ParentForm