import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { api } from '../services/api';
import AppointmentActions from '../components/AppointmentActions';

export default function AppointmentDetailScreen({ route }) {
  const { id } = route.params;
  const [appt, setAppt] = useState(null);
  const [notes, setNotes] = useState('');
  const [photos, setPhotos] = useState([]);

  const load = async () => {
    const data = await api.getAppointment(id);
    setAppt(data);
  };
  useEffect(()=>{ load(); }, [id]);

  const addPhoto = async () => {
    const res = await launchImageLibrary({ mediaType:'photo', selectionLimit:3 });
    if (res.assets) setPhotos(prev => [...prev, ...res.assets.map(a=>({uri:a.uri}))]);
  };

  const finishWithData = async () => {
    try {
      await api.finishAppointment(id, {lat:0,lng:0}, notes, photos.map(p=>p.uri));
      Alert.alert('Tamamlandı', 'Randevu not ve fotoğraflarla kapatıldı.');
      await load();
    } catch (e) { Alert.alert('Hata', e.message); }
  };

  if (!appt) return null;

  return (
    <ScrollView style={{flex:1, padding:12}}>
      <Text style={s.h1}>{appt.title}</Text>
      <Text style={s.sub}>Durum: {appt.status}</Text>

      <View style={{marginVertical:8}}>
        <AppointmentActions appt={appt} />
      </View>

      <Text style={s.label}>Notlar</Text>
      <TextInput
        style={s.input}
        multiline
        placeholder="Görüşme notları..."
        value={notes}
        onChangeText={setNotes}
      />

      <Text style={s.label}>Stand Fotoğrafları</Text>
      <View style={{flexDirection:'row', flexWrap:'wrap'}}>
        {photos.map((p,i)=> <Image key={i} source={{uri:p.uri}} style={{width:90,height:90, marginRight:6, marginBottom:6}} />)}
      </View>
      <Button title="Fotoğraf Ekle" onPress={addPhoto} />

      {appt.status==='STARTED' && (
        <View style={{marginTop:12}}>
          <Button title="Not & Fotoğraflarla Bitir" onPress={finishWithData} />
        </View>
      )}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  h1:{ fontSize:20, fontWeight:'700' },
  sub:{ color:'#666', marginVertical:6 },
  label:{ marginTop:12, marginBottom:6, fontWeight:'600' },
  input:{ borderWidth:1, borderColor:'#ddd', borderRadius:8, padding:10, minHeight:80 }
});
