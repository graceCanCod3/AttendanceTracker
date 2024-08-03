import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './sidebar.css';

export default function Nav() {
    const [parents, setParents] = useState([]);
    const [students, setStudents] = useState([]);
    const [showStudentsDropdown, setShowStudentsDropdown] = useState(false);
    const [showParentsDropdown, setShowParentsDropdown] = useState(false);

    useEffect(() => {
        const getParents = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/parentcontacts/');
                setParents(response.data);
            } catch (error) {
                console.error('Cannot get parents:', error);
            }
        };

        const getStudents = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/students/');
                setStudents(response.data);
            } catch (error) {
                console.error('Cannot get students:', error);
            }
        };

        getParents();
        getStudents();
    }, []);

    return (
        <div className="sidebar">
            <div className="sidebar-section">
                <button onClick={() => setShowStudentsDropdown(!showStudentsDropdown)}>
                    Students
                </button>
                {showStudentsDropdown && (
                    <div className="sidebar-dropdown">
                        {students.map(student => (
                            <Link key={student.id} to={`/students/${student.id}`}>
                                {student.first_name} {student.last_name}
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <div className="sidebar-section">
                <button onClick={() => setShowParentsDropdown(!showParentsDropdown)}>
                    Parents
                </button>
                {showParentsDropdown && (
                    <div className="sidebar-dropdown">
                        {parents.map(parent => (
                            <Link key={parent.id} to={`/parentcontacts/${parent.id}`}>
                                {parent.first_name} {parent.last_name}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
