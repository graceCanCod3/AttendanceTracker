import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ClassSession.css';

export default function ClassSession() {
    const [sessions, setSessions] = useState([]);
    const [formState, setFormState] = useState({
        id: null,
        subject: '',
        instructor: '',
        date: '',
        start_time: '',
        end_time: '',
        day_type: ''
    });
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getAllSessions = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/classsessions/');
                const sessionsData = response.data;

                const detailedSessions = await Promise.all(sessionsData.map(async (session) => {
                    const subjectResponse = await axios.get(session.subject);
                    const instructorResponse = await axios.get(session.instructor);
                    return {
                        ...session,
                        subject: subjectResponse.data.name,
                        instructor: `${instructorResponse.data.first_name} ${instructorResponse.data.last_name}`
                    };
                }));

                setSessions(detailedSessions);
            } catch (error) {
                console.error('Error getting class sessions:', error);
            }
        };
        getAllSessions();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
    };

    const handleSessionClick = (id) => {
        const session = sessions.find(session => session.id === id);
        if (session) {
            setFormState({
                id: session.id,
                subject: session.subject,
                instructor: session.instructor,
                date: session.date,
                start_time: session.start_time,
                end_time: session.end_time,
                day_type: session.day_type
            });
            setEditMode(true);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/classsessions/${id}/`);
            setSessions(sessions.filter(session => session.id !== id));
        } catch (error) {
            console.error('Error deleting class session:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editMode) {
                const response = await axios.put(`http://127.0.0.1:8000/api/classsessions/${formState.id}/`, formState);
                const updatedSession = response.data;
                setSessions(sessions.map(session => (session.id === updatedSession.id ? updatedSession : session)));
                setEditMode(false);
            } else {
                const response = await axios.post('http://127.0.0.1:8000/api/classsessions/', formState);
                const newSession = response.data;
                setSessions([...sessions, newSession]);
            }
            setFormState({
                id: null,
                subject: '',
                instructor: '',
                date: '',
                start_time: '',
                end_time: '',
                day_type: ''
            });
        } catch (error) {
            console.error('Error saving class session:', error);
        }
    };

    return (
        <div>
            <h1>Class Sessions</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="subject"
                    value={formState.subject}
                    onChange={handleInputChange}
                    placeholder="Subject"
                    required
                />
                <input
                    type="text"
                    name="instructor"
                    value={formState.instructor}
                    onChange={handleInputChange}
                    placeholder="Instructor"
                    required
                />
                <input
                    type="date"
                    name="date"
                    value={formState.date}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="time"
                    name="start_time"
                    value={formState.start_time}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="time"
                    name="end_time"
                    value={formState.end_time}
                    onChange={handleInputChange}
                    required
                />
                <select
                    name="day_type"
                    value={formState.day_type}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Select Day Type</option>
                    <option value="A">A Day</option>
                    <option value="B">B Day</option>
                </select>
                <button type="submit">{editMode ? 'Update' : 'Add'} Session</button>
            </form>
            <ul>
                {sessions.map(session => (
                    <li key={session.id}>
                        <p><strong>Subject:</strong> {session.subject}</p>
                        <p><strong>Instructor:</strong> {session.instructor}</p>
                        <p><strong>Date:</strong> {session.date}</p>
                        <p><strong>Time:</strong> {session.start_time} - {session.end_time}</p>
                        <p><strong>Day Type:</strong> {session.day_type}</p>
                        <button onClick={() => handleSessionClick(session.id)}>Edit</button>
                        <button onClick={() => handleDelete(session.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}


