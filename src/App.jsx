import Header from './components/Header/Header';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import { AuthProvider, useAuth } from './context/AuthContext';

function AppRoutes() {
  const { userName } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {!userName && <Route path="/register" element={<Register />} />}
      {userName && <Route path="/register" element={<Navigate to="/" replace />} />}
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router basename="/tfm-front">
        <Header />
        <div className="main-content">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}


/**
 * rm -rf dist   
 * npm run build
 * npm run deploy
 */

export default App
