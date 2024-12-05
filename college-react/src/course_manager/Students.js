import React, { useState, useEffect } from 'react';

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
  );
}

export default StudentFetcher;
