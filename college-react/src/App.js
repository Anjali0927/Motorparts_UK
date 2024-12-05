import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Nav from './course_manager/Nav'
import Home from './course_manager/Home'
import Courses from './course_manager/Courses';
import CourseNew from './course_manager/CourseNew';
import CourseEdit from './course_manager/CourseEdit';
import CourseDelete from './course_manager/CourseDelete';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/new" element={<CourseNew />} />
        <Route path="/course/edit" element={<CourseEdit />} />
        <Route path="/course/delete" element={<CourseDelete />} />
      </Routes>
    </BrowserRouter>
  )
}


export default App;
