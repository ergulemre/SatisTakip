import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  const { login } = useAuth();
  const [email,setEmail]=useState('demo@ornek.com');
  const [password,setPassword]=useState('123456');
  const [role,setRole]=useState('SALES'); // ADMIN, MANAGER

  return (
    <View style={s.c}>
      <Text style={s.h1}>Satış Takip</Text>
      <TextInput placeholder="E-posta" style={s.inp} value={email} onChangeText={setEmail}/>
      <TextInput placeholder="Şifre" style={s.inp} secureTextEntry value={password} onChangeText={setPassword}/>
      <View style={{flexDirection:'row', marginVertical:8}}>
        {['SALES','MANAGER','ADMIN'].map(r=>(
          <Button key={r} title={r} onPress={()=>setRole(r)} color={role===r?'#007AFF':'#999'} />
        ))}
      </View>
      <Button title="Giriş" onPress={()=>login(email,password,role)} />
    </View>
  );
}
const s=StyleSheet.create({ c:{flex:1, justifyContent:'center', padding:16}, h1:{fontSize:24,fontWeight:'700', marginBottom:16}, inp:{borderWidth:1,borderColor:'#ccc', borderRadius:8, padding:12, marginBottom:10}});
