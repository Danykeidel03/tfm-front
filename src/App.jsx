import Header from './components/Header/Header';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Exercises from './pages/Exercises/Exercises';
import Chat from './components/Chat/Chat';
import { AuthProvider, useAuth } from './context/AuthContext';

function AppRoutes() {
  const { userName } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {!userName && <Route path="/register" element={<Register />} />}
      {userName && <Route path="/register" element={<Navigate to="/" replace />} />}

      {userName && <Route path="/exercises" element={<Exercises />} />}
      {!userName && <Route path="/exercises" element={<Navigate to="/" replace />} />}
    </Routes>
  );
}

function AppContent() {
  const { userName } = useAuth();

  return (
    <Router basename="/tfm-front">
      <Header />
      {userName && <Chat />}
      <div className="main-content">
        <AppRoutes />
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

/**
 * rm -rf dist   
 * npm run build
 * npm run deploy
 */

export default App;
