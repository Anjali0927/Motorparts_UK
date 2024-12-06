import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/*
{
    "id": 1,
    "first_name": "Chris",
    "last_name": "Matchett",
    "email": "chrismatchett@hotmail.com",
    "student_number": "123"
}
*/

function StudentDelete() {
  const [data, setData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const navigate = useNavigate();

  // Fetch existing students
  useEffect(() => {
    fetch('/api/students?format=json')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  // Function to handle selecting a student to delete
  const handleSelectStudent = (studentId) => {
    setSelectedStudent(studentId);
  };

  // Function to handle deleting a student
  const handleDeleteStudent = () => {
    if (!selectedStudent) {
      alert('Please select a student to delete.');
      return;
    }

    fetch(`/api/students/${selectedStudent}/`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setData((prevData) =>
            prevData.filter((student) => student.id !== selectedStudent)
          );
          setSelectedStudent('');
          console.log('Student deleted successfully.');
          navigate('/students');
        } else {
          console.error('Failed to delete student.');
        }
      })
      .catch((error) => {
        console.error('Error deleting student:', error);
      });
  };

  return (
    <div className="p-8">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
        Delete Student
      </h1>

      <select
        value={selectedStudent}
        onChange={(e) => handleSelectStudent(Number(e.target.value))}
        className="mb-8 w-full p-2 border rounded-lg"
      >
        <option value="">Select a Student to Delete</option>
        {data.map((student) => (
          <option key={student.id} value={student.id}>
            {student.first_name} {student.last_name}
          </option>
        ))}
      </select>

      <button
        onClick={handleDeleteStudent}
        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        Delete Student
      </button>
    </div>
  );
}

export default StudentDelete;
