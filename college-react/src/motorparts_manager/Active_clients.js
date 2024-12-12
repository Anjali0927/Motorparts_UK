import React, { useEffect, useState } from 'react';

function ActiveClients() {
  const [activeClients, setActiveClients] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActiveClients = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/active_clients/');
        const data = await response.json();
        setActiveClients(data.active_clients);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchActiveClients();
  }, []);

  return (
    <div className="bg-white shadow-md rounded p-4 m-4">
      <h2 className="text-2xl size-full font-bold mb-4">Active Clients</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <p className="text-xl">{activeClients}</p>
      )}
    </div>
  );
}

export default ActiveClients;
