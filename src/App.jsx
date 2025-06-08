import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useRef } from 'react';
import Header from './components/Header/Header';
import Chat from './components/Chat/Chat';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Exercises from './pages/Exercises/Exercises';
import AdminPanel from './pages/AdminPanel/AdminPanel';
import Footer from './components/Footer/Footer';
import Calories from './pages/Calories/Calories';
import NotFound from './pages/NotFound/NotFound';
import SaberMas from './pages/SaberMas/SaberMas';
import Progress from './pages/Progress/Progress';
import Contacto from './pages/Contacto/Contacto';
import './App.css';
import { ModalProvider } from './context/ModalContext';

function AppRoutes({ headerRef }) {
  const { userName } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/saberMas" element={<SaberMas />} />

      <Route path="/contacto" element={<Contacto />} />

      {!userName && <Route path="/register" element={<Register />} />}
      {userName && <Route path="/register" element={<Navigate to="/" replace />} />}

      {userName && <Route path="/exercises" element={<Exercises headerRef={headerRef} />} />}
      {!userName && <Route path="/exercises" element={<Navigate to="/" replace />} />}

      {userName && <Route path="/progress" element={<Progress headerRef={headerRef} />} />}
      {!userName && <Route path="/progress" element={<Navigate to="/" replace />} />}

      {userName && <Route path="/calorias" element={<Calories />} />}
      {!userName && <Route path="/calorias" element={<Navigate to="/" replace />} />}

      {userName && <Route path="/panelAdmin" element={<AdminPanel />} />}
      {!userName && <Route path="/panelAdmin" element={<Navigate to="/" replace />} />}

      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

function AppContent() {
  const { userName } = useAuth();
  const location = useLocation();
  const headerRef = useRef();

  const isAdminPanel = location.pathname === '/panelAdmin';

  return (
    <>
      {!isAdminPanel && <Header ref={headerRef} />}
      {!isAdminPanel && <Footer />}
      {!isAdminPanel && userName && <Chat />}
      <div className="main-content">
        <AppRoutes headerRef={headerRef} />
      </div>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ModalProvider>
          <AppContent />
        </ModalProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;