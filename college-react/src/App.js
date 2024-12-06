import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Nav from './course_manager/Nav'
import Home from './course_manager/Home'
import CourseFetcher from './course_manager/Courses';
import CourseNew from './course_manager/CourseNew';
import CourseEdit from './course_manager/CourseEdit';
import CourseDelete from './course_manager/CourseDelete';
import LecturerFetcher from './course_manager/Lecturers';
import LecturerNew from './course_manager/LecturerNew';
import LecturerEdit from './course_manager/LecturerEdit';
import LecturerDelete from './course_manager/LecturerDelete';
import StudentFetcher from './course_manager/Students';
import StudentNew from './course_manager/StudentNew';
import StudentEdit from './course_manager/StudentEdit';
import StudentDelete from './course_manager/StudentDelete';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<CourseFetcher />} />
        <Route path="/course/new" element={<CourseNew />} />
        <Route path="/course/edit" element={<CourseEdit />} />
        <Route path="/course/delete" element={<CourseDelete />} />
        <Route path="/lecturers" element={<LecturerFetcher />} />
        <Route path="/lecturer/new" element={<LecturerNew />} />
        <Route path="/lecturer/edit" element={<LecturerEdit />} />
        <Route path="/lecturer/delete" element={<LecturerDelete />} />
        <Route path="/students" element={<StudentFetcher />} />
        <Route path="/student/new" element={<StudentNew />} />
        <Route path="/student/edit" element={<StudentEdit />} />
        <Route path="/student/delete" element={<StudentDelete />} />
      </Routes>
    </BrowserRouter>
  )
}


export default App;
