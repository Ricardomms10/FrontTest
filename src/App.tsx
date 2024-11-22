// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RequestRide from './pages/RequestRide';
import TravelOptions from './pages/TravelOptions';
import TravelHistory from './pages/TravelHistory';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RequestRide />} /> 
        <Route path="/ride-options" element={<TravelOptions />} />
        <Route path="/travel-history" element={<TravelHistory />} />
      </Routes>
    </Router>
  );
};

export default App;
