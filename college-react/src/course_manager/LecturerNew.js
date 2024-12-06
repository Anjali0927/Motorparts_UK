import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Lecturers({ name }) {
  return <li>{name}</li>;
}

function LecturerFetcher() {
  const [data, setData] = useState([]);
  const [lock, setLock] = useState(false);
  const [firstNameValue, setFirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [staffNumberValue, setStaffNumberValue] = useState('');

  const navigate = useNavigate();

  // Fetch existing lecturers
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/lecturers?format=json')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  // Function to handle adding a new lecturer
  const handleAddLecturer = () => {
    setLock(true);

    const newLecturer = {
      first_name: firstNameValue,
      last_name: lastNameValue,
      email: emailValue,
      staff_number: staffNumberValue,
    };

    fetch('http://127.0.0.1:8000/api/lecturers/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newLecturer),
    })
      .then((response) => response.json())
      .then((newLecturerData) => {
        setData((prevData) => [...prevData, newLecturerData]);
        setFirstNameValue('');
        setLastNameValue('');
        setEmailValue('');
        setStaffNumberValue('');
        setLock(false);

        navigate('/lecturers');
      })
      .catch((error) => {
        console.error('Error adding lecturer:', error);
      });
  };

  return (
    <div className="p-8">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
        Lecturers
      </h1>

      <div className="mb-8">
        <div className="space-y-4 mt-4">
          <input
            type="text"
            placeholder="First Name"
            value={firstNameValue}
            onChange={(e) => setFirstNameValue(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastNameValue}
            onChange={(e) => setLastNameValue(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="email"
            placeholder="Email"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Staff Number"
            value={staffNumberValue}
            onChange={(e) => setStaffNumberValue(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />

          <button
            onClick={handleAddLecturer}
            disabled={lock}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Add Lecturer
          </button>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-8">Existing Lecturers</h2>
      <ul className="mt-4 space-y-2">
        {data.map((lecturer) => (
          <Lecturers
            key={lecturer.id}
            name={`${lecturer.first_name} ${lecturer.last_name}`}
          />
        ))}
      </ul>
    </div>
  );
}

export default LecturerFetcher;
