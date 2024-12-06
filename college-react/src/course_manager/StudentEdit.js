import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function StudentEdit() {
  const [data, setData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [FirstNameValue, setFirstnameValue] = useState('');
  const [LastNameValue, setLastNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [StudentNumberValue, setStudentNumberValue] = useState('');

  const navigate = useNavigate();

  // Fetch existing students
  useEffect(() => {
    fetch('/api/students?format=json')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  // Function to handle selecting a student to edit
  const handleSelectStudent = (studentId) => {
    const student = data.find((student) => student.id === studentId);
    if (student) {
      setSelectedStudent(studentId);
      setFirstnameValue(student.first_name);
      setLastNameValue(student.last_name);
      setEmailValue(student.email);
      setStudentNumberValue(student.student_number);
    }
  };

  // Function to handle updating a student
  const handleEditStudent = () => {
    if (!FirstNameValue.trim() || !LastNameValue.trim() || !emailValue.trim()) {
      alert('First Name, Last Name, and Email are required!');
      return;
    }

    const updatedStudent = {
      first_name: FirstNameValue,
      last_name: LastNameValue,
      email: emailValue,
      student_number: StudentNumberValue,
    };

    fetch(`/api/students/${selectedStudent}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedStudent),
    })
      .then((response) => response.json())
      .then((updatedStudentData) => {
        setData((prevData) =>
          prevData.map((student) =>
            student.id === selectedStudent ? updatedStudentData : student
          )
        );
        setSelectedStudent('');
        navigate('/students');
      })
      .catch((error) => {
        console.error('Error updating student:', error);
      });
  };

  return (
    <div className="p-8">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
        Edit Student
      </h1>

      <select
        value={selectedStudent}
        onChange={(e) => handleSelectStudent(Number(e.target.value))}
        className="mb-8 w-full p-2 border rounded-lg"
      >
        <option value="">Select a Student to Edit</option>
        {data.map((student) => (
          <option key={student.id} value={student.id}>
            {student.first_name} {student.last_name}
          </option>
        ))}
      </select>

      {selectedStudent && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Edit Student Details</h2>
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
              placeholder="Student Number"
              value={StudentNumberValue}
              onChange={(e) => setStudentNumberValue(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />

            <button
              onClick={handleEditStudent}
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Update Student
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentEdit;
