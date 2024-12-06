import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Students({ title }) {
  return <li>{title}</li>;
}

function StudentFetcher() {
  const [data, setData] = useState([]);
  const [lock, setLock] = useState(false);
  const [FirstNameValue, setFirstNameValue] = useState('');
  const [LastNameValue, setLastNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [StudentNumberValue, setStudentNumberValue] = useState('');


  const navigate = useNavigate();

  // Function to handle the form submission
  const handleAddStudent = () => {

    setLock(true);

    const newStudent = {
      first_name: FirstNameValue,
      last_name: LastNameValue,
      email: emailValue,
      student_number: StudentNumberValue
    };

    fetch('http://127.0.0.1:8000/api/students/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStudent),
    })
      .then((response) => response.json())
      .then((newStudentData) => {
        setFirstNameValue('');
        setLastNameValue('');
        setEmailValue('');
        setStudentNumberValue('');
        setLock(false);

        navigate('/students');

      })
      .catch((error) => console.error('Error adding student:', error));
  };

  return (
    <div className="p-8">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
        Students
      </h1>

      <div className="mb-8">
        <div className="space-y-4 mt-4">
          <input
            type="text"
            placeholder="Student Firstname"
            value={FirstNameValue}
            onChange={(e) => setFirstNameValue(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Student Surname"
            value={LastNameValue}
            onChange={(e) => setLastNameValue(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="email"
            placeholder="Student Email"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="number"
            placeholder="Student Number"
            value={StudentNumberValue}
            onChange={(e) => setStudentNumberValue(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />

          <button
            onClick={handleAddStudent}
            disabled={lock}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Add Student
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentFetcher;
