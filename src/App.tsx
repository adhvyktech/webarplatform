import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ARExperience from './pages/ARExperience';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ar-experience" element={<ARExperience />} />
      </Routes>
    </Router>
  );
};

export default App;