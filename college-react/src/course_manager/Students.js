import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Students({ first_name, last_name, student_number }) {
  return (
    <li>
      {first_name} {last_name} (Student Number: {student_number})
    </li>
  );
}

function StudentFetcher() {
  const [data, setData] = useState(null); // All students
  const [studentNumber, setStudentNumber] = useState(''); // Student number to search
  const [searchedStudent, setSearchedStudent] = useState(null); // Student found from search
  const [error, setError] = useState(''); // Error message if student not found

  // Fetch all students when component loads
  useEffect(() => {
    fetch('/api/students?format=json')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching students:', error));
  }, []);

  // Function to handle searching for a student by student number
  const handleSearch = () => {
    if (!studentNumber) {
      setError('Please enter a student number to search.');
      return;
    }

    // Fetch student by student_number
    fetch(`/api/student/number/${studentNumber}?format=json`)  // API endpoint by student_number
      .then((response) => {
        if (!response.ok) {
          setError('Student not found.');
          setSearchedStudent(null);
        } else {
          return response.json();
        }
      })
      .then((student) => {
        setSearchedStudent(student);
        setError('');
      })
      .catch((error) => {
        console.error('Error fetching student:', error);
        setError('An error occurred while fetching the student.');
      });
  };

  return (
    <div className="p-8">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">Students</h1>

      <Link to="/student/new" className="mr-4">
        Add Student |
      </Link>
      <Link to="/student/edit" className="mr-4">
        Edit Student |
      </Link>
      <Link to="/student/delete" className="mr-4">
        Delete Student
      </Link>

      {/* Search for a student */}
      <div className="mt-8 mb-8 p-4 border rounded-lg shadow-sm">
        <h3 className="mb-2 text-xl font-bold">Find Student by Student Number</h3>
        <input
          type="text"
          placeholder="Enter Student Number"
          value={studentNumber}
          onChange={(e) => setStudentNumber(e.target.value)}
          className="p-2 border rounded-lg mb-2 w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Search
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        {searchedStudent && (
          <div className="mt-4 p-4 border rounded-lg shadow-sm bg-gray-100">
            <h4 className="text-lg font-semibold">Student Details</h4>
            <p>
              <strong>Name:</strong> {searchedStudent.first_name} {searchedStudent.last_name}
            </p>
            <p>
              <strong>Email:</strong> {searchedStudent.email}
            </p>
            <p>
              <strong>Student Number:</strong> {searchedStudent.student_number}
            </p>
          </div>
        )}
      </div>

      {/* Display All Students */}
      <div className="mt-8">
        <h3 className="text-xl font-bold">All Students</h3>
        {data && data.length > 0 ? (
          <ul>
            {data.map((student, index) => (
              <Students
                key={index}
                first_name={student.first_name}
                last_name={student.last_name}
                student_number={student.student_number}
              />
            ))}
          </ul>
        ) : (
          <p>Loading students...</p>
        )}
      </div>
    </div>
  );
}

export default StudentFetcher;
