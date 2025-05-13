import React, { useState } from 'react';
import './Header.css'

const Header = () => {

  const [isMenuActive, setIsMenuActive] = useState(false);

  const openMenu = () => {
    setIsMenuActive(!isMenuActive)
  }

  const [isLoginActive, setIsLoginActive] = useState(false);

  const openLogin = () => {
    setIsLoginActive(!isLoginActive)
  }

  return (
    <div className="header">
      <div className="header__logo-container">
        <a title="Inicio" href="index.html" aria-label="Inicio">
          <img
            src="logo.png"
            alt="Logo"
            className="header__logo"
            width="48px"
            height="48px"
          />
        </a>
        <div className="accordionMenu" onClick={openMenu}>
          <img src="hamburgerMenu.png" alt="Hamburger Menu" />
        </div>
      </div>

      <div className="divUser">
        <div className="bienvenidoUser"></div>
        <div className="bienvenidoUserPhoto">
          <img className="imgUser" src="" alt="" />
        </div>
      </div>

      <div className="loginDiv active">
        <img
          onClick={openLogin}
          className="imageLogin"
          src="logoLogin.png"
          alt="Logo"
          width="48px"
          height="48px"
        />
        <div className={`divLoginForm${isLoginActive ? ' active' : ''}`}>
          <h3>Logueate</h3>
          <div className="formLogin">
            <input
              type="email"
              className="mailLogin"
              placeholder="Mail"
              name="mailLogin"
            />
            <input
              type="password"
              className="passLogin"
              placeholder="Contraseña"
              name="passLogin"
            />
            <button className="loginButton">Login</button>
            <a className="urlRegister" href="register.html">
              Registrate
            </a>
          </div>
        </div>
      </div>
      <div className={`menu-content${isMenuActive ? ' active' : ''}`}>
        <div className="divGestionarTareas">
          <ul>
            <li>
              <p>
                <a href="exercises.html">Ver Tareas</a>
              </p>
            </li>
            <li className="addTarea">
              <p>Añadir Tarea</p>
            </li>
            <li className="addFood">
              <p>Añadir Comida</p>
            </li>
          </ul>
        </div>
        <div className="divLogout">
          <button>Cerrar Sesión</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
