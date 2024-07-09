import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import SignUp from './components/Signup';
import Vehicle from './components/Vehicle';
import EditVehicle from './components/EditVehicle';
import ViewPage from './components/viewPage'
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/landingPage" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/vehicle" element={<Vehicle />} />
          <Route path="/edit/:id/:model/:vId" element={<EditVehicle />} />
          <Route path="/view/:id" element={<ViewPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;