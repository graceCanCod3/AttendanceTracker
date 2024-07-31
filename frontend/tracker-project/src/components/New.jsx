// import { useNavigate } from 'react-router-dom'
// import { useEffect, useState, useRef } from 'react'
// import axios from 'axios'
// import Levenshtein from 'fast-levenshtein'


// export default function Null () {
//     const [searchQuery, setSearchQuery] = useState('')
//     const [userData, setUserData] = useState({})
//     const [showUserMenu, setShowUserMenu] = useState(false)
//     const [showLoginForm, setShowLoginForm] = useState(false)
//     const [formState, setFormState] = useState({ username: '', password: '', error: '' })
//     const [users, setUsers] = useState([])
//     const loginFormRef = useRef(null)
//     const userMenuRef = useRef(null)
//     const navigate = useNavigate()
//     const loggedInUser = localStorage.getItem('loggedInUser')

//     useEffect(() => {
//         if (loggedInUser) {
//             const getUserData = async (userId) => {
//                 const response = await axios.get(`http://127.0.0.1:8000/api/${userId}`)
//                 setUserData(response.data)
//             }
//             getUserData(loggedInUser)
//         }

//         const getUsers = async () => {
//             try {
//                 const response = await axios.get(`http://127.0.0.1:8000/api/`)
//                 setUsers(response.data)
//             } catch (error) {
//                 console.error('Could not find users', error)
//             }
//         }
//         getUsers()
//     }, [loggedInUser])

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
//                 setShowUserMenu(false)
//             }
//             if (loginFormRef.current && !loginFormRef.current.contains(event.target)) {
//                 setShowLoginForm(false)
//             }
//         }

//         document.addEventListener('mousedown', handleClickOutside)

//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside)
//         }
//     }, [])

//     const handleSearchChange = (e) => {
//         setSearchQuery(e.target.value)
//     }

//     const handleSearchSubmit = async (e) => {
//         e.preventDefault()
//         try {
//             const [studentsResponse, instructorsResponse, subjectsResponse] = await Promise.all([
//                 axios.get('http://127.0.0.1:8000/api/students/'),
//                 axios.get('http://127.0.0.1:8000/api/instructors/'),
//                 axios.get('http://127.0.0.1:8000/api/subjects/')
//             ])
//             const students = studentsResponse.data
//             const instructors = instructorsResponse.data
//             const subjects = subjectsResponse.data

        
//             const adjustedSearchQuery = searchQuery.trim().toLowerCase()

//             const findStudent = students.find(student =>
//                 student.student_name.toLowerCase().includes(adjustedSearchQuery)
//             )
//             const findInstructor = instructors.find(instructor =>
//                 instructor.instructor_name.toLowerCase().includes(adjustedSearchQuery)
//             )
//             const findSubject = subjects.find(subject =>
//               subject.subject_name.toLowerCase().includes(adjustedSearchQuery)
//           )

//             if (findStudent) {
//                 navigate(`/students/${findStudent.id}`)
//             } else if (findInstructor) {
//                 navigate(`/instructors/${findInstructor.id}`)
//             } else if (findSubject) {
//                 navigate(`/subjects/${findSubject.id}`)
//             } else {
               
//                 const potentialMatches = [
//                     ...students.map(student => ({
//                         ...student,
//                         type: 'student',
//                         similarity: Levenshtein.get(adjustedSearchQuery, student.student_name.toLowerCase())
//                     })),
//                     ...instructors.map(instructor => ({
//                         ...instructor,
//                         type: 'instructor',
//                         similarity: Levenshtein.get(adjustedSearchQuery, instructor.instructor_name.toLowerCase())
//                     })),
//                     ...subjects.map(subject => ({
//                       ...subject,
//                       type: 'subject',
//                       similarity: Levenshtein.get(adjustedSearchQuery, subject.subject_name.toLowerCase())
//                     }))
//                 ]

//                 potentialMatches.sort((a, b) => a.similarity - b.similarity)

//                 navigate('/search', {
//                     state: {
//                         searchQuery,
//                         potentialMatches
//                     }
//                 })
//             }
//         } catch (error) {
//             console.error('Error fetching data:', error)
//             alert('There was an error processing your search.')
//         }
//     }

//     const toggleUserMenu = () => {
//         setShowUserMenu(!showUserMenu)
//     }

//     const toggleLoginForm = () => {
//         setShowLoginForm(!showLoginForm)
//     }

//     const handleLoginChange = (e) => {
//         setFormState({ ...formState, [e.target.id]: e.target.value, error: '' })
//     }

//     const handleLoginSubmit = (e) => {
//         e.preventDefault()
//         const user = users.find(user => user.user_name === formState.username)
//         if (!user) {
//             setFormState({ ...formState, error: 'Username does not exist' })
//             return
//         }
//         if (user.password !== formState.password) {
//             setFormState({ ...formState, error: 'Incorrect Password' })
//             return
//         }
//         else {
//             localStorage.setItem('loggedInUser', user.id)
//             setShowLoginForm(false)
//         }
//         window.location.reload()
//     }

//     const handleLogout = () => {
//         localStorage.removeItem('loggedInUser')
//         setShowUserMenu(false)
//         window.location.reload()
//     }
    
//     return (
//         <div className="header">
//             <img src={Logo} alt="Logo" className="logo" onClick={() => navigate('/')}/>
//             <form className="searchForm" onSubmit={handleSearchSubmit}>
//                 <input className='searchBar'
//                     type="text"
//                     id='searchBar'
//                     placeholder='Search for students, instructors, or subjects'
//                     value={searchQuery}
//                     onChange={handleSearchChange}
//                 />
//                 <button className='searchBtn' type='submit'>Search</button>
//             </form>
//             <div className="headerLinks">
//                 <button onClick={() => navigate('/')}>VENUES</button>
//                 <button onClick={() => navigate('/events')}>EVENTS</button>
//                 {loggedInUser ? (
//                     <div className="userMenu" ref={userMenuRef}>
//                         <img onClick={toggleUserMenu}src={userData.user_photo}/>
//                             {showUserMenu && (
//                                 <ul className="dropdown">
//                                     <li onClick={() => navigate(`/user/${loggedInUser}`)}>My Events</li>
//                                     <li onClick={handleLogout}>Logout</li>
//                                 </ul>
//                             )}
//                     </div>
//                 ) : (
//                     <button onClick={toggleLoginForm}>Log In</button>
//                 )}
//                 {showLoginForm && (
//                     <div className="loginOverlay" ref={loginFormRef}>
//                         <form className="loginForm" onSubmit={handleLoginSubmit}>
//                             <input type="text" id="username" placeholder="User Name" onChange={handleLoginChange} />
//                             <input type="password" id="password" placeholder="Enter your password" onChange={handleLoginChange} />
//                             <button type="submit">Log in</button>
//                         </form>
//                     </div>
//                 )}
//             </div>
//         </div>
//     )
// }