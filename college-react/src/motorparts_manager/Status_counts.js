import React, { useEffect, useState } from 'react';

function StatusCounts() {
  const [statusCounts, setStatusCounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatusCounts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/status_counts/');
        const data = await response.json();
        setStatusCounts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchStatusCounts();
  }, []);

  const formatStatus = (status) => {
    return status.replace(/_/g, ' ');
  };

  return (
    <div className="bg-white shadow-md rounded p-4 m-4">
      <h2 className="text-xl font-bold mb-2">Status Counts</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className=" bg-white size-full striped-bg-gray-100">
          <thead>
            <tr>
              <th className="text-left py-2 px-4 bg-gray-200">Status</th>
              <th className="text-left py-2 px-4 bg-gray-200">Count</th>
            </tr>
          </thead>
          <tbody>
            {statusCounts.map((statusCount, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{formatStatus(statusCount.status)}</td>
                <td className="py-2 px-4 border-b">{statusCount.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StatusCounts;

