import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CourseEdit() {
  const [data, setData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
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

  // Function to handle selecting a course to edit
  const handleSelectCourse = (courseId) => {
    const course = data.find((course) => course.id === courseId);
    if (course) {
      setSelectedCourse(courseId);
      setTitleValue(course.title);
      setDescriptionValue(course.description);
      setLecturerValue(course.lecturer?.id || '');
      setStudentValue(course.students.map((student) => student.id));
    }
  };

  // Function to handle updating a course
  const handleEditCourse = () => {
    if (!titleValue.trim() || !lecturerValue) {
      alert('Title and Lecturer are required!');
      return;
    }

    const updatedCourse = {
      title: titleValue,
      description: descriptionValue,
      lecturer: lecturerValue,
      students: studentValue,
    };

    fetch(`/api/courses/${selectedCourse}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCourse),
    })
      .then((response) => response.json())
      .then((updatedCourseData) => {
        setData((prevData) =>
          prevData.map((course) =>
            course.id === selectedCourse ? updatedCourseData : course
          )
        );
        setSelectedCourse('');
        navigate('/courses');
      })
      .catch((error) => {
        console.error('Error updating course:', error);
      });
  };

  return (
    <div className="p-8">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
        Edit Course
      </h1>

      <select
        value={selectedCourse}
        onChange={(e) => handleSelectCourse(Number(e.target.value))}
        className="mb-8 w-full p-2 border rounded-lg"
      >
        <option value="">Select a Course to Edit</option>
        {data.map((course) => (
          <option key={course.id} value={course.id}>
            {course.title}
          </option>
        ))}
      </select>

      {selectedCourse && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Edit Course Details</h2>
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
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.first_name} {student.last_name}
                </option>
              ))}
            </select>

            <button
              onClick={handleEditCourse}
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Update Course
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseEdit;
