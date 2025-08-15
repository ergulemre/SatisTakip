import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('demo@ornek.com');
  const [password, setPassword] = useState('123456');
  const [role, setRole] = useState('SALES'); // ADMIN, MANAGER
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Hata', 'E-posta ve şifre gerekli');
      return;
    }

    setIsLoggingIn(true);
    
    try {
      // Fake API çağrısı yapıyormuş gibi görünsün
      const result = await login(email, password, role);
      
      if (result.success) {
        Alert.alert('Başarılı', 'Giriş yapıldı!');
      } else {
        Alert.alert('Hata', result.error || 'Giriş başarısız');
      }
    } catch (error) {
      Alert.alert('Hata', 'Bir hata oluştu');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <View style={s.c}>
      <Text style={s.h1}>Satış Takip</Text>
      
      <TextInput 
        placeholder="E-posta" 
        style={s.inp} 
        value={email} 
        onChangeText={setEmail}
        editable={!isLoggingIn}
      />
      
      <TextInput 
        placeholder="Şifre" 
        style={s.inp} 
        secureTextEntry 
        value={password} 
        onChangeText={setPassword}
        editable={!isLoggingIn}
      />
      
      <View style={{flexDirection:'row', marginVertical:8}}>
        {['SALES','MANAGER','ADMIN'].map(r=>(
          <Button 
            key={r} 
            title={r} 
            onPress={()=>setRole(r)} 
            color={role===r?'#007AFF':'#999'} 
            disabled={isLoggingIn}
          />
        ))}
      </View>
      
      {isLoggingIn ? (
        <View style={s.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={s.loadingText}>Giriş yapılıyor...</Text>
        </View>
      ) : (
        <Button 
          title="Giriş" 
          onPress={handleLogin}
          disabled={loading}
        />
      )}
    </View>
  );
}

const s = StyleSheet.create({ 
  c: {
    flex: 1, 
    justifyContent: 'center', 
    padding: 16
  }, 
  h1: {
    fontSize: 24,
    fontWeight: '700', 
    marginBottom: 16
  }, 
  inp: {
    borderWidth: 1,
    borderColor: '#ccc', 
    borderRadius: 8, 
    padding: 12, 
    marginBottom: 10
  },
  loadingContainer: {
    alignItems: 'center',
    marginVertical: 20
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666'
  }
});
