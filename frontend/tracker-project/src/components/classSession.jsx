import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ClassSession() {
  const [sessions, setSessions] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getAllSessions()
  }, [])

  const getAllSessions = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/classsessions`)
      setSessions(response.data)
    } catch (error) {
      console.error('Error getting class sessions:', error)
    }
  };

  const handleSessionClick = (id) => {
    navigate(`/classsessions/${id}`)
  }

    return (
      <div>
        <h1>Class Sessions</h1>
        <ul>
          {sessions.map(session => (
            <li key={session.id} onClick={() => handleSessionClick(session.id)}>
              {session.subject.name} - {session.date}
            </li>
          ))}
        </ul>
      </div>
  )
}
