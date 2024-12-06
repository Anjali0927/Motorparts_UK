import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const barData = [
  { label: 'A', value: 5 },
  { label: 'B', value: 6 },
  { label: 'F', value: 7 },
];

function Home() {
  return (
    <div>
      <div className="p-8">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Welcome to the Course Manager
        </h1>
      </div>
      <div className="mt-8">
        <BarChart
          width={500}
          height={300}
          data={barData}
          margin={{
            top: 20, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#3182bd" />
        </BarChart>
      </div>
    </div>
  );
}

export default Home;
  
