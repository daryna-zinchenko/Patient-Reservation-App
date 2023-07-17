import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppointmentsPage } from './pages/AppointmentsPage';
import { FormsPage } from './pages/FormsPage';

export const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<FormsPage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="*" element={<h1>NotFound</h1>} />
      </Routes>
    </div>
  );
}
