import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ARExperience from './components/ARExperience';
import ARView from './components/ARView';
import Home from './components/Home';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<ARExperience />} />
          <Route path="/view/:id" element={<ARView />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;