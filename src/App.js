import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Etudiants from './pages/Etudiants';
import Cours from './pages/Cours';
import Filieres from './pages/Filieres';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/etudiants" element={<Etudiants />} />
          <Route path="/cours" element={<Cours />} />
          <Route path="/filieres" element={<Filieres />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;