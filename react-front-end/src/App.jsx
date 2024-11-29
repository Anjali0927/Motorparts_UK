import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Nav from './course_manager/Nav'
import Home from './course_manager/Home'
import CourseFetcher from './course_manager/CoursesFetcher';
import LecturerFetcher from './course_manager/LecturersFetcher';
import StudentFetcher from './course_manager/StudentsFetcher';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<CourseFetcher />} />
        <Route path="/lecturers" element={<LecturerFetcher />} />
        <Route path="/students" element={<StudentFetcher />} />
      </Routes>
    </BrowserRouter>
  )
}


export default App;
