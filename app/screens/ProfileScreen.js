import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  return (
    <View style={{flex:1, padding:12}}>
      <Text style={{fontSize:18, fontWeight:'700'}}>{user?.fullName}</Text>
      <Text>Rol: {user?.role}</Text>
      <View style={{height:12}}/>
      <Button title="Çıkış" onPress={logout} />
    </View>
  );
}
