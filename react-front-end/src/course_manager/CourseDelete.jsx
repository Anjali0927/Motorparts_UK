import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CourseDelete() {
  const [data, setData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const navigate = useNavigate();

  // Fetch existing courses
  useEffect(() => {
    fetch('/api/courses?format=json')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  // Function to handle selecting a course to delete
  const handleSelectCourse = (courseId) => {
    setSelectedCourse(courseId);
  };

  // Function to handle deleting a course
  const handleDeleteCourse = () => {
    if (!selectedCourse) {
      alert('Please select a course to delete.');
      return;
    }

    fetch(`/api/courses/${selectedCourse}/`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setData((prevData) =>
            prevData.filter((course) => course.id !== selectedCourse)
          );
          setSelectedCourse('');
          console.log('Course deleted successfully.');
          navigate('/courses');
        } else {
          console.error('Failed to delete course.');
        }
      })
      .catch((error) => {
        console.error('Error deleting course:', error);
      });
  };

  return (
    <div className="p-8">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
        Delete Course
      </h1>

      <select
        value={selectedCourse}
        onChange={(e) => handleSelectCourse(Number(e.target.value))}
        className="mb-8 w-full p-2 border rounded-lg"
      >
        <option value="">Select a Course to Delete</option>
        {data.map((course) => (
          <option key={course.id} value={course.id}>
            {course.title}
          </option>
        ))}
      </select>

      <button
        onClick={handleDeleteCourse}
        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        Delete Course
      </button>
    </div>
  );
}

export default CourseDelete;
