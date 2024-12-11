import { Link } from 'react-router-dom';

function Nav(props) {
  return (
      <nav  className="p-8 bg-blue-500 text-white">
        <Link to="/" className="pr-2">Home</Link>| 
        <Link to="/Users" className="p-2">Users</Link>|
        <Link to="/Salesteams" className="p-2">Sales Teams</Link>|
        <Link to="/Clients" className="p-2">Clients</Link>|
        <Link to="/Customers" className="p-2">Customers</Link>|
        <Link to="/Locations" className="p-2">Locations</Link>|
        <Link to="/Opportunities" className="p-2">Opportunities</Link>
        
      </nav>
  );
}

export default Nav;