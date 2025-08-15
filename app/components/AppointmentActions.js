import React from 'react';
import { Button, Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { api } from '../services/api';

async function getCoords() {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => reject(err),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  });
}

export default function AppointmentActions({ appt }) {
  const onStart = async () => {
    try {
      const coords = await getCoords();
      await api.startAppointment(appt.id, coords);
      Alert.alert('Başlatıldı', 'Randevu başladı.');
    } catch (e) { Alert.alert('Hata', e.message); }
  };

  const onFinish = async () => {
    try {
      const coords = await getCoords();
      await api.finishAppointment(appt.id, coords);
      Alert.alert('Bitti', 'Randevu tamamlandı.');
    } catch (e) { Alert.alert('Hata', e.message); }
  };

  if (appt.status === 'PLANNED') return <Button title="Toplantıyı Başlat" onPress={onStart} />;
  if (appt.status === 'STARTED') return <Button title="Toplantıyı Bitir" onPress={onFinish} />;
  return null;
}
