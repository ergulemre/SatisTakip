// app/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Uygulama açıldığında token’ı oku
    const loadUser = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        setUser({ role: decoded.role, ...decoded }); // role token’dan
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (token) => {
    await AsyncStorage.setItem('token', token);
    const decoded = jwtDecode(token);
    setUser({ role: decoded.role, ...decoded });
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
