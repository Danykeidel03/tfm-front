import React from 'react';
import Header from './components/Header/Header';
import './App.css'

function App() {
 return (
    <div className="App">
      <Header />
      <div style={{ padding: '1rem' }}>
        <h1>Bienvenido a la app</h1>
        <p>Aquí va el contenido principal.</p>
      </div>
    </div>
  );
}

/**
 * rm -rf dist   
 * npm run build
 * npm run deploy
 */

export default App
