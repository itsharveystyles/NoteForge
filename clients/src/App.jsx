import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./utils/AuthContext"; // Import the AuthProvider
import Home from "./pages/Home/Home"; // Correct path for Home component
import Login from "./pages/Login/Login"; // Correct path for Login component
import SignUp from "./pages/SignUp/SignUp"; // Correct path for SignUp component
import Navbar from "./components/Navbar/Navbar.jsx"; // Correct path for Navbar component
import Footer from "./components/Footer/Footer.jsx"; // Correct path for Footer component
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
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;