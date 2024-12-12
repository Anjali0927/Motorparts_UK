import React from 'react';
import { Link } from 'react-router-dom';
import logo from './motorparts-logo.jpg'; // Adjust the path as needed

function Nav() {
  return (
    <nav className="bg-gray-800 shadow-md font-roboto mb-10">
      <div className="container mx-auto p-4 flex items-center justify-between">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 mr-4" />
          <h1 className="text-xl font-bold text-green-500">Motorparts CRM</h1>
        </div>
        <div className="flex space-x-6">
          <Link to="/dashboard" className="text-white hover:text-green-500 hover:underline transition duration-300">Dashboard</Link>
          <Link to="/users" className="text-white hover:text-green-500 hover:underline transition duration-300">Users</Link>
          <Link to="/sales_teams" className="text-white hover:text-green-500 hover:underline transition duration-300">Sales Teams</Link>
          <Link to="/clients" className="text-white hover:text-green-500 hover:underline transition duration-300">Clients</Link>
          <Link to="/customers" className="text-white hover:text-green-500 hover:underline transition duration-300">Customers</Link>
          <Link to="/locations" className="text-white hover:text-green-500 hover:underline transition duration-300">Locations</Link>
          <Link to="/opportunities" className="text-white hover:text-green-500 hover:underline transition duration-300">Opportunities</Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav;


