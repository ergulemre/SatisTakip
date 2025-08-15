import React, { useState } from 'react';
import { 
  TouchableOpacity, 
  Text, 
  Alert, 
  StyleSheet, 
  ActivityIndicator,
  View 
} from 'react-native';
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
  const [loading, setLoading] = useState(false);

  const onStart = async () => {
    try {
      setLoading(true);
      const coords = await getCoords();
      await api.startAppointment(appt.id, coords);
      Alert.alert('Başlatıldı', 'Toplantı başladı. Konum takibi aktif.');
    } catch (e) { 
      Alert.alert('Hata', e.message || 'Konum alınamadı'); 
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async () => {
    try {
      setLoading(true);
      const coords = await getCoords();
      await api.finishAppointment(appt.id, coords);
      Alert.alert('Tamamlandı', 'Toplantı başarıyla tamamlandı.');
    } catch (e) { 
      Alert.alert('Hata', e.message || 'Konum alınamadı'); 
    } finally {
      setLoading(false);
    }
  };

  const onReschedule = () => {
    Alert.alert(
      'Randevu Ertelenmesi',
      'Bu randevuyu ertelenecek mi?',
      [
        { text: 'İptal', style: 'cancel' },
        { text: 'Ertelen', onPress: () => {
          // Randevu ertelenmesi işlemi
          Alert.alert('Bilgi', 'Randevu ertelendi. Yeni randevu oluşturulacak.');
        }}
      ]
    );
  };

  if (appt.status === 'PLANNED') {
    return (
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.startButton]} 
          onPress={onStart}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <Text style={styles.buttonIcon}>▶️</Text>
              <Text style={styles.buttonText}>Başlat</Text>
            </>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.rescheduleButton]} 
          onPress={onReschedule}
          disabled={loading}
        >
          <Text style={styles.buttonIcon}>⏰</Text>
          <Text style={styles.buttonText}>Ertelen</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  if (appt.status === 'STARTED') {
    return (
      <TouchableOpacity 
        style={[styles.actionButton, styles.finishButton]} 
        onPress={onFinish}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <>
            <Text style={styles.buttonIcon}>⏹️</Text>
            <Text style={styles.buttonText}>Bitir</Text>
          </>
        )}
      </TouchableOpacity>
    );
  }
  
  if (appt.status === 'COMPLETED') {
    return (
      <View style={styles.completedContainer}>
        <Text style={styles.completedIcon}>✅</Text>
        <Text style={styles.completedText}>Tamamlandı</Text>
      </View>
    );
  }
  
  return null;
}

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: 'row',
    gap: 8
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    minWidth: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  startButton: {
    backgroundColor: '#34C759'
  },
  finishButton: {
    backgroundColor: '#FF3B30'
  },
  rescheduleButton: {
    backgroundColor: '#FF9500'
  },
  buttonIcon: {
    fontSize: 16,
    marginRight: 6
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600'
  },
  completedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 25,
    minWidth: 100
  },
  completedIcon: {
    fontSize: 16,
    marginRight: 6
  },
  completedText: {
    color: '#34C759',
    fontSize: 14,
    fontWeight: '600'
  }
});
