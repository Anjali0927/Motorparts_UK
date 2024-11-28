import React, { useState, useEffect } from 'react';

function Courses({title}) {
  return <li>{title}</li>;
}

function CourseFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/courses?format=json')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div>
      {/* data ? <p>Data: {JSON.stringify(data)}</p> : <p>Loading...</p> */}
 
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Courses</h1>
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
