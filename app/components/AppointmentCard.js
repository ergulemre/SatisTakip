import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AppointmentActions from './AppointmentActions';

export default function AppointmentCard({ appt, onPress }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'PLANNED': return '#FF9500';
      case 'STARTED': return '#007AFF';
      case 'COMPLETED': return '#34C759';
      case 'CANCELLED': return '#FF3B30';
      default: return '#8E8E93';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'PLANNED': return 'Planlandı';
      case 'STARTED': return 'Başladı';
      case 'COMPLETED': return 'Tamamlandı';
      case 'CANCELLED': return 'İptal Edildi';
      default: return status;
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(appt.plannedStart)}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(appt.status) }]}>
          <Text style={styles.statusText}>{getStatusText(appt.status)}</Text>
        </View>
      </View>
      
      <View style={styles.cardContent}>
        <Text style={styles.title} numberOfLines={2}>{appt.title}</Text>
        
        {appt.customerName && (
          <View style={styles.customerInfo}>
            <Text style={styles.customerIcon}>👤</Text>
            <Text style={styles.customerName}>{appt.customerName}</Text>
          </View>
        )}
        
        {appt.location && (
          <View style={styles.locationInfo}>
            <Text style={styles.locationIcon}>📍</Text>
            <Text style={styles.locationText}>{appt.location}</Text>
          </View>
        )}
        
        {appt.notes && (
          <Text style={styles.notes} numberOfLines={2}>{appt.notes}</Text>
        )}
      </View>
      
      <View style={styles.cardActions}>
        <AppointmentActions appt={appt} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden'
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  timeContainer: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF'
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    textTransform: 'uppercase'
  },
  cardContent: {
    padding: 16,
    paddingTop: 12
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    lineHeight: 22
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  customerIcon: {
    fontSize: 16,
    marginRight: 8
  },
  customerName: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500'
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  locationIcon: {
    fontSize: 16,
    marginRight: 8
  },
  locationText: {
    fontSize: 14,
    color: '#666'
  },
  notes: {
    fontSize: 13,
    color: '#888',
    fontStyle: 'italic',
    lineHeight: 18
  },
  cardActions: {
    padding: 16,
    paddingTop: 0
  }
});
