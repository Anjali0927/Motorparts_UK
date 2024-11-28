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
 
      <h1>Courses</h1>
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
