import React from 'react';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router basename="/tfm-front">
        <div className='app'>
          <Header />
          <div className='main-content'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/register' element={<Register />} />
            </Routes>
          </div>
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
