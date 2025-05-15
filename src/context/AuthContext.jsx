import React, { createContext, useContext, useState, useEffect } from 'react';

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
    setUserName('');
    setUserPhoto('');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userPhoto');
  };

  return (
    <AuthContext.Provider value={{ userName, setUserName, userPhoto, setUserPhoto, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
