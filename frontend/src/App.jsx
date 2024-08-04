import './App.css';
import { Route, Routes, Navigate } from "react-router-dom";
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { useSelector } from 'react-redux';

function App() {
  const { token } = useSelector(state => state.auth);

  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to={token ? "/" : "/login"} />} />
    </Routes>
  );
}

export default App;
