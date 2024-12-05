import { Link } from 'react-router-dom';

function Nav(props) {
  return (
      <nav  className="p-8 bg-blue-500 text-white">
        <Link to="/" className="pr-2">Home</Link>| 
        <Link to="/courses" className="p-2">Courses</Link>|
        <Link to="/lecturers" className="p-2">Lecturers</Link>|
        <Link to="/students" className="p-2">Students</Link>
      </nav>
  );
}

export default Nav;
