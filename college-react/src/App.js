import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Nav from './motorparts_manager/Nav'
import './App.css'
import Location from './motorparts_manager/Locations';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route>
          <Route path="/locations" element={<Location/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}


export default App;
