import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ARExperience from './pages/ARExperience';
import ARView from './pages/ARView';
import './styles/global.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ar-experience" element={<ARExperience />} />
          <Route path="/view/:id" element={<ARView />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;