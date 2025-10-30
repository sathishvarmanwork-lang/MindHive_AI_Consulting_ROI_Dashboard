import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ROIDashboardProvider } from './context/ROIDashboardContext';
import { Step1Setup } from './components/Step1Setup';
import { Step2Integrations } from './components/Step2Integrations';
import { Step3Baseline } from './components/Step3Baseline';
import { Step4Tracking } from './components/Step4Tracking';
import { Step5Report } from './components/Step5Report';

function App() {
  return (
    <ROIDashboardProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/setup" replace />} />
          <Route path="/setup" element={<Step1Setup />} />
          <Route path="/integrations" element={<Step2Integrations />} />
          <Route path="/baseline" element={<Step3Baseline />} />
          <Route path="/tracking" element={<Step4Tracking />} />
          <Route path="/report" element={<Step5Report />} />
        </Routes>
      </Router>
    </ROIDashboardProvider>
  );
}

export default App;
