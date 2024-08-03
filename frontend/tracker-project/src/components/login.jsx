import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
const login = () => {
    let navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        const response = await axios.get('http://localhost:8000/api/customusers/', { username, password })
            setMessage(response.data.message)
            navigate('/')
      } catch (error) {
         setMessage('Login failed')
          console.error('Error:', error)
          }
        };
    return (
      <div>
      <h2>Login</h2>
      <form className='Login' onSubmit={handleSubmit}>
          <div>
              <label>Username:</label>
              <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div>
              <label>Password:</label>
              <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
      </div>
    )
}
export default login