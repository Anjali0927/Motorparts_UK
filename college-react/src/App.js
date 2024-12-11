import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Nav from './motorparts_manager/Nav'
import './App.css'
import Location from './motorparts_manager/Locations';
import Clients from './motorparts_manager/Clients';
import Customers from './motorparts_manager/Customers';
import Sales_teams from './motorparts_manager/Sales_teams';
import Users from './motorparts_manager/Users';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route>
          <Route path="/locations" element={<Location/>} />
          <Route path="/clients" element={<Clients/>} />
          <Route path="/customers" element={<Customers/>} />
          <Route path="/sales_teams" element={<Sales_teams/>} />
          <Route path="/users" element={<user/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}


export default App;
