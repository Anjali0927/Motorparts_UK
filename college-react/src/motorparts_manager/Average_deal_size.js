import React, { useEffect, useState } from 'react';

function AverageDealSize() {
  const [averageDealSize, setAverageDealSize] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAverageDealSize = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/average_deal_size/');
        const data = await response.json();
        setAverageDealSize(data.average_value);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAverageDealSize();
  }, []);

  return (
    <div className="bg-white shadow-md rounded p-4 m-4">
      <h2 className="text-xl size-full font-bold mb-2">Average Deal Size</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <p className="text-lg">${averageDealSize.toLocaleString()}</p>
      )}
    </div>
  );
}

export default AverageDealSize;