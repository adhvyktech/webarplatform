import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ARExperience from './pages/ARExperience';
import ARView from './pages/ARView';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ar-experience" element={<ARExperience />} />
        <Route path="/view/:id" element={<ARView />} />
      </Routes>
    </Router>
  );
};

export default App;