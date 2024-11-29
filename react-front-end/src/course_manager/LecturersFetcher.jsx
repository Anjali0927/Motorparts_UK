import React, { useState, useEffect } from 'react';

/*
{
    "id": 1,
    "first_name": "Chris",
    "last_name": "Matchett",
    "email": "chrismatchett@hotmail.com",
    "staff_number": "1"
}
*/

function Lecturers({first_name, last_name}) {
  return <li>{first_name} {last_name}</li>;
}

function LecturerFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/lecturers?format=json')
      .then((response) => response.json())
      .then((data) => setData(data))
  }, []);

  return (
    <div className="p-8">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">Lecturers</h1>
      {data && data.length > 0 ? (
        <ul>
          {data.map((lecturer, index) => (
            <Lecturers key={index} first_name={lecturer.first_name} last_name={lecturer.last_name} />
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}

    </div>
  );
}

export default LecturerFetcher;
