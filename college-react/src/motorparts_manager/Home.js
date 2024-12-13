import React from 'react';
import StatusCounts from './Status_counts';
import TotalRevenue from './Total_revenue';
import ActiveClients from './Active_clients';
import CustomersByLocation from './Customers_by_location';
import SalesTeamPerformance from './Sales_team_performance';
import AverageDealSize from './Average_deal_size';

function Home() {
  return (
    <div className="Home container mx-auto p-4">
      <header className="mb-4">
        <h1 className="text-2xl font-bold">Welcome to the Motorparts UK CRM</h1>
      </header>
      <main className="grid grid-cols-1 lg:grid-cols-4 gap-4 auto-rows-max">
        <div className="p-4 col-span-2 justify-stretch bg-white rounded shadow">
          <StatusCounts />
        </div>
        <div className="p-4 bg-white rounded shadow">
          <TotalRevenue />
        </div>
        <div className="p-4 bg-white rounded shadow">
          <ActiveClients />
        </div>
        <div className="p-4 col-span-2 justify-stretch bg-white rounded shadow">
          <CustomersByLocation />
        </div>
        <div className="p-4 bg-white rounded shadow">
          <SalesTeamPerformance />
        </div>
        <div className="p-4 bg-white rounded shadow">
          <AverageDealSize />
        </div>
      </main>
      <footer className="mt-4 text-center">
        <p>© 2024 Motorparts UK. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;

