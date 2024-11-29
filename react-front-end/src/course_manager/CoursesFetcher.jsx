import React, { useState, useEffect } from 'react';

/*
{
    "id": 1,
    "title": "React for Dummies (like Chris)",
    "description": "Learn how to use React, Vite to communicate with a Django API",
    "lecturer": null,
    "students": []
}
*/

function Courses({title}) {
  return <li>{title}</li>;
}

function CourseFetcher() {
  const [data, setData] = useState(null);
  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [lecturerValue, setLecturerValue] = useState('');

  useEffect(() => {
    fetch('/api/courses?format=json')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="p-8">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">Courses</h1>
      {data && data.length > 0 ? (
        <ul>
          {data.map((course, index) => (
            <Courses key={index} title={course.title || course.name || `Course ${index + 1}`} />
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}

    </div>
  );
}

export default CourseFetcher;
