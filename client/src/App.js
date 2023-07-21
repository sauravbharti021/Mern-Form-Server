import './App.css'
import Navbar from './components/Navbar';
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Login from './components/Login'
import Register from './components/Register';
import Error from './components/Error/Error';
import Logout from './components/Logout';
import {Routes, Route} from "react-router-dom"

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Error/>}/>
      </Routes>
      
    
    </>
  );
}

export default App;
