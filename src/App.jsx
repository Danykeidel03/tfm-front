import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header/Header';
import Chat from './components/Chat/Chat';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Exercises from './pages/Exercises/Exercises';
import AdminPanel from './pages/AdminPanel/AdminPanel';
import './App.css';

function AppRoutes() {
  const { userName } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {!userName && <Route path="/register" element={<Register />} />}
      {userName && <Route path="/register" element={<Navigate to="/" replace />} />}

      {userName && <Route path="/exercises" element={<Exercises />} />}
      {!userName && <Route path="/exercises" element={<Navigate to="/" replace />} />}

      {userName && <Route path="/panelAdmin" element={<AdminPanel />} />}
      {!userName && <Route path="/panelAdmin" element={<Navigate to="/" replace />} />}
    </Routes>
  );
}

function AppContent() {
  const { userName } = useAuth();
  const location = useLocation();

  const isAdminPanel = location.pathname === '/panelAdmin';

  return (
    <>
      {!isAdminPanel && <Header />}
      {!isAdminPanel && userName && <Chat />}
      <div className="main-content">
        <AppRoutes />
      </div>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
