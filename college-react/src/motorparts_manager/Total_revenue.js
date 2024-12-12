import React, { useEffect, useState } from 'react';

function TotalRevenue() {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotalRevenue = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/total_revenue/');
        const data = await response.json();
        setTotalRevenue(data.total_revenue || 0); // Ensure totalRevenue is not null
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchTotalRevenue();
  }, []);

  return (
    <div className="p-4 bg-white shadow rounded-md mb-4">
      <h2 className="text-xl font-bold mb-2">Total Revenue</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <p className="text-lg">${totalRevenue.toLocaleString()}</p>
      )}
    </div>
  );
}

export default TotalRevenue;
