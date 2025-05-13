import React from 'react';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home';

function App() {
  return (
    <Router basename="/tfm-front">
      <div className='app'>
        <Header />
        <div className='main-content'>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

/**
 * rm -rf dist   
 * npm run build
 * npm run deploy
 */

export default App
