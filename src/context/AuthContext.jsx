import React, { createContext, useContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userName, setUserName] = useState(() => sessionStorage.getItem('userName') || '');
  const [userPhoto, setUserPhoto] = useState(() => sessionStorage.getItem('userPhoto') || '');

  useEffect(() => {
    if (userName) {
      sessionStorage.setItem('userName', userName);
    }
  }, [userName]);

  useEffect(() => {
    if (userPhoto) {
      sessionStorage.setItem('userPhoto', userPhoto);
    }
  }, [userPhoto]);

  const logout = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setUserName('');
        setUserPhoto('');
        sessionStorage.removeItem('userName');
        sessionStorage.removeItem('userPhoto');

        Swal.fire({
          title: 'Sesión cerrada',
          text: 'Has cerrado sesión correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          window.location.reload();
        });
      }
    });
  };

  return (
    <AuthContext.Provider value={{ userName, setUserName, userPhoto, setUserPhoto, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
