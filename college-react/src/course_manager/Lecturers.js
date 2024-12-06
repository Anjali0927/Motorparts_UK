import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/*
{
    "id": 1,
    "first_name": "Chris",
    "last_name": "Matchett",
    "email": "chrismatchett@hotmail.com",
    "staff_number": "1"
}
*/

function Lecturer({first_name, last_name}) {
  return <li>{first_name} {last_name}</li>;
}

function Lecturers() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/lecturers?format=json')
      .then((response) => response.json())
      .then((data) => setData(data))
  }, []);

  return (
    <div className="p-8">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">Lecturers</h1>
      <Link
      to="/lecturer/new"
      className=""
      >
        Add Lecturer | 
      </Link>
      <Link
      to="/lecturer/edit"
      className="pl-2"
      >
        Edit Lecturer |
      </Link>
      <Link
      to="/lecturer/delete"
      className="pl-2"
      >
        Delete Lecturer
      </Link>

      <div className="mt-4 mb-4 p-4 border rounded-lg shadow-sm">
      <h3 className="mb-2 text-xl font-bold">Lecturers</h3>
        {data && data.length > 0 ? (
          <ul>
            {data.map((lecturer, index) => (
              <Lecturer key={index} id={lecturer.id} first_name={lecturer.first_name} last_name={lecturer.last_name} />
            ))}
          </ul>
        ) : (
          <p>Loading...</p>
        )}
      </div>

    </div>
  );
}

export default Lecturers;
