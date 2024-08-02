import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom"
import axios from 'axios' 

export default function ParentList () {
    const [parent, setParent] = useState(null)
    const {id} = useParams()
    useEffect(() => {
        const parentData = async () => {
            try {
                const url = `http://127.0.0.1:8000/api/parentcontacts/${id}`
                const response = await axios.get(url)
                if (response.status !== 200) {
                    throw new Error('Not working')
                }
                setParent(response.data)
            } catch (error) {
                console.error('Error grabbing parent', error)
            }
        }
    parentData()
    }, [id])
    if (!parent) {
        return <div>Loading...</div>
    }

    return (
    <div className = 'Parent'>
       <h1>Parent page</h1>
             <h2>First Name: {parent.first_name}</h2>
             <h3>Last Name: {parent.last_name}</h3>
             <h3>Phone: {parent.phone}</h3>
             <h4>Email: {parent.email}</h4>
             <p>Address: {parent.address}</p>
                <Link to={`/parentcontacts/${id}/update`}>Update Parent</Link>
           </div>
    )
}

