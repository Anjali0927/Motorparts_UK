import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Nav from './motorparts_manager/Nav';
import './App.css';
import Location from './motorparts_manager/Locations';
import Home from './motorparts_manager/Home';
import Users from './motorparts_manager/Users';
import Customer from './motorparts_manager/Customers';
import SalesTeam from './motorparts_manager/Sales_teams';
import Client from './motorparts_manager/Clients';
import Opportunities from './motorparts_manager/Opportunities';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/locations" element={<Location />} />
          <Route path="/clients" element={<Client />} />
          <Route path="/users" element={<Users />} />
          <Route path="/customers" element={<Customer />} />
          <Route path="/sales_teams" element={<SalesTeam />} />
          <Route path="/opportunities" element={<Opportunities />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

