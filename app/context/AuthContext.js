// app/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Uygulama açıldığında token'ı oku
    const loadUser = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const decoded = jwtDecode(token);
          setUser({ role: decoded.role, ...decoded }); // role token'dan
        }
      } catch (error) {
        console.error('Token yüklenirken hata:', error);
      }
    };
    loadUser();
  }, []);

  const login = async (email, password, role) => {
    try {
      // Fake API çağrısı simülasyonu
      setLoading(true);
      
      // API isteği yapılıyormuş gibi görünsün
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Fake token oluştur (gerçek uygulamada bu API'den gelir)
      const fakeToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwicm9sZSI6Ii${role}IiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`;
      
      // Token'ı kaydet
      await AsyncStorage.setItem('token', fakeToken);
      
      // User state'ini güncelle
      const userData = {
        id: '123',
        email: email,
        name: 'Demo Kullanıcı',
        role: role,
        token: fakeToken
      };
      
      setUser(userData);
      setLoading(false);
      
      return { success: true, user: userData };
    } catch (error) {
      setLoading(false);
      console.error('Login error:', error);
      return { success: false, error: 'Giriş başarısız' };
    }
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
