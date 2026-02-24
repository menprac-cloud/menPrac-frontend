// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// --- IMPORT SCREENS ---
import LandingPage from './screens/Landing/LandingPage';
import Login from './screens/Auth/Login';
import Register from './screens/Auth/Register';
import Dashboard from './screens/Dashboard/Dashboard';
import Learners from './screens/Dashboard/Learners';
import Programs from './screens/Dashboard/Programs';
import SessionRunner from './screens/Session/SessionRunner';
import LearnerProfile from './screens/Dashboard/LearnerProfile';
import Messages from './screens/Dashboard/Message';
import Settings from './screens/Dashboard/Settings';

// --- PLACEHOLDER SCREENS (For future builds) ---
const ForgotPassword = () => <div style={{ padding: '50px', textAlign: 'center', color: '#fff' }}><h2>Forgot Password (Coming Soon)</h2></div>;


function App() {
  // Global App Styles to maintain the Dark SaaS Theme everywhere
  const appStyles = {
    backgroundColor: '#080514', // Aura's deep dark background
    minHeight: '100vh',
    color: '#ffffff',
    fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    margin: 0,
    padding: 0
  };

  return (
    <div style={appStyles}>
      <Router>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* PROTECTED ROUTES (Clinician specific) */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/learners" element={<Learners />} />
          <Route path="/programs" element={<Programs />} />
          
          {/* CRITICAL FIX: Added /:id so the profile knows WHICH patient to load */}
          <Route path="/learner/:id" element={<LearnerProfile />} />
          
          <Route path="/session/:learnerId" element={<SessionRunner />} />

          {/* SIDEBAR NAVIGATION ROUTES */}
          <Route path="/messages" element={<Messages />} />
          <Route path="/settings" element={<Settings />} />

          {/* CATCH-ALL REDIRECT */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;