import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./utils/AuthContext";
import Home from "./pages/Home/Home"; 
import Login from "./pages/Login/Login"; 
import SignUp from "./pages/SignUp/SignUp"; 
import Dashboard from "./pages/Dashboard/Dashboard"; 
import Navbar from "./components/Navbar/Navbar.jsx"; 
import Footer from "./components/Footer/Footer.jsx";
import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;