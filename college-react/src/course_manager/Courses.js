import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
  return <p>{title}</p>;
}

function NewCourse() {
  const [data, setData] = useState(null);
  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [lecturerValue, setLecturerValue] = useState('');

  useEffect(() => {
    fetch('/api/courses/?format=json')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((e) => console.log(e))
  }, []);

  return (
    <div className="p-8">
      <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">Courses</h1>
      <Link
      to="/course/new"
      className=""
      >
        Add Course | 
      </Link>
      <Link
      to="/course/edit"
      className="pl-2"
      >
        Edit Course |
      </Link>
      <Link
      to="/course/delete"
      className="pl-2"
      >
        Delete Course
      </Link>

      {data && data.length > 0 ? (
        <ul className="mt-8">
          {data.map((course, index) => (
            <Courses key={index} title={course.title || course.name || `Course ${index + 1}`} />
          ))}
        </ul>
      ) : (
        <p className="mt-8">There are no courses to view.</p>
      )}

    </div>
  );
}

export default NewCourse;
