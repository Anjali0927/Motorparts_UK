import React, { useEffect, useState } from 'react';

function CustomersByLocation() {
  const [customersByLocation, setCustomersByLocation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomersByLocation = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/customers_by_location/');
        const data = await response.json();
        setCustomersByLocation(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCustomersByLocation();
  }, []);

  return (
    <div className="bg-white shadow-md rounded p-4 m-4">
      <h2 className="text-2xl font-bold mb-4">Customers by Location</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full size-full bg-white border">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left px-4 py-2 border">Location</th>
              <th className="text-left px-4 py-2 border">Customer Count</th>
            </tr>
          </thead>
          <tbody>
            {customersByLocation.map((location, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{location.location__name}</td>
                <td className="px-4 py-2 border">{location.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CustomersByLocation;
