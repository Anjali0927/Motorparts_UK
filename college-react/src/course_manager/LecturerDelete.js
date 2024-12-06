import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LecturerDelete() {
  const [data, setData] = useState([]);
  const [selectedLecturer, setSelectedLecturer] = useState('');
  const navigate = useNavigate();

  // Fetch existing lecturers
  useEffect(() => {
    fetch('/api/lecturers?format=json')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  // Function to handle selecting a lecturer to delete
  const handleSelectLecturer = (lecturerId) => {
    setSelectedLecturer(lecturerId);
  };

  // Function to handle deleting a lecturer
  const handleDeleteLecturer = () => {
    if (!selectedLecturer) {
      alert('Please select a lecturer to delete.');
      return;
    }

    fetch(`/api/lecturers/${selectedLecturer}/`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setData((prevData) =>
            prevData.filter((lecturer) => lecturer.id !== selectedLecturer)
          );
          setSelectedLecturer('');
          console.log('Lecturer deleted successfully.');
          navigate('/lecturers');
        } else {
          console.error('Failed to delete lecturer.');
        }
      })
      .catch((error) => {
        console.error('Error deleting lecturer:', error);
      });
  };

  return (
    <div className="p-8">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
        Delete Lecturer
      </h1>

      <select
        value={selectedLecturer}
        onChange={(e) => handleSelectLecturer(Number(e.target.value))}
        className="mb-8 w-full p-2 border rounded-lg"
      >
        <option value="">Select a Lecturer to Delete</option>
        {data.map((lecturer) => (
          <option key={lecturer.id} value={lecturer.id}>
            {lecturer.first_name} {lecturer.last_name}
          </option>
        ))}
      </select>

      <button
        onClick={handleDeleteLecturer}
        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        Delete Lecturer
      </button>
    </div>
  );
}

export default LecturerDelete;
