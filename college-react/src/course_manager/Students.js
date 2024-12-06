import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/*
{
    "id": 1,
    "first_name": "Chris",
    "last_name": "Matchett",
    "email": "chrismatchett@hotmail.com",
    "student_number": "123"
}
*/

function Students({first_name, last_name}) {
  return <li>{first_name} {last_name}</li>;
  
}

function StudentFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/students?format=json')
      .then((response) => response.json())
      .then((data) => setData(data))
  }, []);

  return (
    <div className="p-8">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">Students</h1>
      <Link
      to="/student/new"
      className=""
      >
        Add Student | 
      </Link>
      <Link
      to="/student/edit"
      className="pl-2"
      >
        Edit Student |
      </Link>
      <Link
      to="/student/delete"
      className="pl-2"
      >
        Delete Student
      </Link>

      <div className="mt-4 mb-4 p-4 border rounded-lg shadow-sm">
      <h3 className="mb-2 text-xl font-bold">Students</h3>
      {data && data.length > 0 ? (
        <ul>
          {data.map((student, index) => (
            <Students key={index} first_name={student.first_name} last_name={student.last_name} />
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
      </div>

    </div>
  );
}

export default StudentFetcher;
