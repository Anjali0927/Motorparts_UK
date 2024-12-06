import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LecturerEdit() {
  const [data, setData] = useState([]);
  const [selectedLecturer, setSelectedLecturer] = useState('');
  const [FirstNameValue, setFirstnameValue] = useState('');
  const [LastNameValue, setLastNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [StaffNumberValue, setStaffNumberValue] = useState('');

  const navigate = useNavigate();

  // Fetch existing lecturers
  useEffect(() => {
    fetch('/api/lecturers?format=json')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  // Function to handle selecting a lecturer to edit
  const handleSelectLecturer = (lecturerId) => {
    const lecturer = data.find((lecturer) => lecturer.id === lecturerId);
    if (lecturer) {
      setSelectedLecturer(lecturerId);
      setFirstnameValue(lecturer.first_name);
      setLastNameValue(lecturer.last_name);
      setEmailValue(lecturer.email);
      setStaffNumberValue(lecturer.staff_number);
    }
  };

  // Function to handle updating a lecturer
  const handleEditLecturer = () => {
    if (!FirstNameValue.trim() || !LastNameValue.trim() || !emailValue.trim()) {
      alert('First Name, Last Name, and Email are required!');
      return;
    }

    const updatedLecturer = {
      first_name: FirstNameValue,
      last_name: LastNameValue,
      email: emailValue,
      staff_number: StaffNumberValue,
    };

    fetch(`/api/lecturers/${selectedLecturer}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedLecturer),
    })
      .then((response) => response.json())
      .then((updatedLecturerData) => {
        setData((prevData) =>
          prevData.map((lecturer) =>
            lecturer.id === selectedLecturer ? updatedLecturerData : lecturer
          )
        );
        setSelectedLecturer('');
        navigate('/lecturers');
      })
      .catch((error) => {
        console.error('Error updating lecturer:', error);
      });
  };

  return (
    <div className="p-8">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
        Edit Lecturer
      </h1>

      <select
        value={selectedLecturer}
        onChange={(e) => handleSelectLecturer(Number(e.target.value))}
        className="mb-8 w-full p-2 border rounded-lg"
      >
        <option value="">Select a Lecturer to Edit</option>
        {data.map((lecturer) => (
          <option key={lecturer.id} value={lecturer.id}>
            {lecturer.first_name} {lecturer.last_name}
          </option>
        ))}
      </select>

      {selectedLecturer && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Edit Lecturer Details</h2>
          <div className="space-y-4 mt-4">
            <input
              type="text"
              placeholder="First Name"
              value={FirstNameValue}
              onChange={(e) => setFirstnameValue(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={LastNameValue}
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
              value={StaffNumberValue}
              onChange={(e) => setStaffNumberValue(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />

            <button
              onClick={handleEditLecturer}
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Update Lecturer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LecturerEdit;
