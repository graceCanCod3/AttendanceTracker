import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default classSession (props) {
  const [sessions, setSessions] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getAllVenues()
  }, [])

  const getAllSessions = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/classsessions')
      setSessions(response.data)
    } catch (error) {
      console.error('Error getting class session:', error)
    }
  }
  const handleSessionClick = (id) => {
    navigate(`/classsessions/${id}`)
  }

    return (

      <div>
        <h1>Class Session</h1>
      </div>
    )
  }
  
 