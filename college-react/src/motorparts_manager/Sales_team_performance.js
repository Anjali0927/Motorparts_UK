import React, { useEffect, useState } from 'react';

function SalesTeamPerformance() {
  const [salesTeamPerformance, setSalesTeamPerformance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalesTeamPerformance = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/sales_team_performance/');
        const data = await response.json();
        setSalesTeamPerformance(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchSalesTeamPerformance();
  }, []);

  return (
    <div className="bg-white shadow-md rounded p-4 m-4">
      <h2 className="text-xl font-bold mb-2">Sales Team Performance</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="size-full min-w-full bg-white">
          <thead>
            <tr>
              <th className="text-left py-2 px-4 bg-gray-200">Sales Team</th>
              <th className="text-left py-2 px-4 bg-gray-200">Opportunities Count</th>
            </tr>
          </thead>
          <tbody>
            {salesTeamPerformance.map((team, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{team.sales_team__name}</td>
                <td className="py-2 px-4 border-b">{team.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SalesTeamPerformance;

