import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { api } from '../services/api';

export default function NewRequestScreen({ route, navigation }) {
  const [type,setType]=useState('DISCOUNT'); // STAND_OPEN, DAY_OFF, TERM, MEETING
  const [note,setNote]=useState('');
  const [rate,setRate]=useState('10');

  const save = async () => {
    const payload = { type, payload:{ rate: Number(rate) }, note };
    const res = await api.createRequest(payload);
    if (route.params?.onCreated) route.params.onCreated(res);
    Alert.alert('Gönderildi');
    navigation.goBack();
  };

  return (
    <View style={{flex:1, padding:12}}>
      <Text style={{fontWeight:'600'}}>Talep Türü</Text>
      <View style={{flexDirection:'row', flexWrap:'wrap', marginVertical:8}}>
        {['STAND_OPEN','DAY_OFF','DISCOUNT','TERM','MEETING'].map(t=>(
          <Button key={t} title={t} onPress={()=>setType(t)} color={type===t?'#007AFF':'#999'} />
        ))}
      </View>
      {type==='DISCOUNT' && (
        <>
          <Text>İskonto Oranı (%)</Text>
          <TextInput keyboardType="numeric" value={rate} onChangeText={setRate}
                     style={{borderWidth:1,borderColor:'#ccc', borderRadius:8, padding:10, marginBottom:10}}/>
        </>
      )}
      <Text>Açıklama / Not</Text>
      <TextInput value={note} onChangeText={setNote} multiline
                 style={{borderWidth:1,borderColor:'#ccc', borderRadius:8, padding:10, minHeight:80}}/>
      <Button title="Gönder" onPress={save}/>
    </View>
  );
}
