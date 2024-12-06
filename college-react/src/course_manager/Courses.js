import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Course({ title, description, lecturer, students }) {
  return (
    <div className="mt-4 mb-4 p-4 border rounded-lg shadow-sm">
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p>{description}</p>
      <p><strong>Lecturer:</strong> {lecturer ? `${lecturer.first_name} ${lecturer.last_name}` : 'No lecturer assigned'}</p>
      <p><strong>Students:</strong> {students.length > 0 ? students.map(student => `${student.first_name} ${student.last_name}`).join(', ') : 'No students enrolled'}</p>
    </div>
  );
}

function CourseFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/courses/?format=json')
      .then((response) => response.json())
      .then((courses) => {
        // For each course, we need to fetch the associated lecturer and student details
        Promise.all(
          courses.map((course) =>
            Promise.all([
              fetch(`/api/lecturers/${course.lecturer}/?format=json`).then((res) => res.json()),
              Promise.all(course.students.map((studentId) => fetch(`/api/students/${studentId}/?format=json`).then((res) => res.json()))),
            ])
              .then(([lecturer, students]) => ({
                ...course,
                lecturer,
                students,
              }))
          )
        ).then((coursesWithDetails) => setData(coursesWithDetails))
        .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="p-8">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">Courses</h1>
      <div className="mb-4">
        <Link to="/course/new" className="mr-2">
          Add Course |
        </Link>
        <Link to="/course/edit" className="mr-2">
          Edit Course |
        </Link>
        <Link to="/course/delete" className="mr-2">
          Delete Course
        </Link>
      </div>

      {data && data.length > 0 ? (
        <div>
          {data.map((course, index) => (
            <Course
              key={course.id}
              title={course.title}
              description={course.description}
              lecturer={course.lecturer}
              students={course.students}
            />
          ))}
        </div>
      ) : (
        <p className="mt-8">There are no courses to view.</p>
      )}
    </div>
  );
}

export default CourseFetcher;
