import { useContext } from "react";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Profile from "./Pages/Profile/Profile";
import Register from "./Pages/Register/Register";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "./State/AuthContext";

function App() {
  const { user } = useContext(AuthContext)

  return (
    <Router>
      <Routes >
        <Route path="/" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
