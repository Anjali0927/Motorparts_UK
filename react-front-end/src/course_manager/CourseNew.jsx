import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Courses({ title }) {
  return <li>{title}</li>;
}

function CourseFetcher() {
  const [data, setData] = useState([]);
  const [lock, setLock] = useState(false);
  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [lecturerValue, setLecturerValue] = useState('');
  const [studentValue, setStudentValue] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [students, setStudents] = useState([]);

  const navigate = useNavigate();

  // Fetch existing courses, lecturers, and students
  useEffect(() => {
    fetch('/api/courses?format=json')
      .then((response) => response.json())
      .then((data) => setData(data));

    fetch('/api/lecturers?format=json')
      .then((response) => response.json())
      .then((data) => setLecturers(data));

    fetch('/api/students?format=json')
      .then((response) => response.json())
      .then((data) => setStudents(data));
  }, []);

  // Function to handle the form submission
  const handleAddCourse = () => {

    setLock(true);

    const newCourse = {
      title: titleValue,
      description: descriptionValue,
      lecturer: lecturerValue,
      students: studentValue,
    };

    fetch('/api/courses/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCourse),
    })
      .then((response) => response.json())
      .then((newCourseData) => {
        setData((prevData) => [...prevData, newCourseData]);
        setTitleValue('');
        setDescriptionValue('');
        setLecturerValue('');
        setStudentValue([]);
        setLock(false);

        navigate('/courses');

      })
      .catch((error) => console.error('Error adding course:', error));
  };

  return (
    <div className="p-8">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
        Courses
      </h1>

      <div className="mb-8">
        <div className="space-y-4 mt-4">
          <input
            type="text"
            placeholder="Course Title"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
          <textarea
            placeholder="Course Description"
            value={descriptionValue}
            onChange={(e) => setDescriptionValue(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
          <select
            value={lecturerValue}
            onChange={(e) => setLecturerValue(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select a Lecturer</option>
            {lecturers.map((lecturer) => (
              <option key={lecturer.id} value={lecturer.id}>
                {lecturer.first_name} {lecturer.last_name}
              </option>
            ))}
          </select>

          <select
            multiple
            value={studentValue}
            onChange={(e) =>
              setStudentValue([...e.target.selectedOptions].map((option) => option.value))
            }
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select Students</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.first_name} {student.last_name}
              </option>
            ))}
          </select>

          <button
            onClick={handleAddCourse}
            disabled={lock}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Add Course
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseFetcher;
