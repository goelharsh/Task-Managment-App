import './App.css'
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { useSelector } from 'react-redux';
function App() {
  const {token} = useSelector(state=>state.auth)
  return (
    <Routes>
      {
        token ? 
        (  <Route path="/" element={<Home/>}/>) :
        (  <Route path="/login" element={<Login/>}/>)
      }
      <Route path="/signup" element={<Signup/>}/>
    
    </Routes>
  )
}

export default App
