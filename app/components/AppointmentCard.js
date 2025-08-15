import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AppointmentActions from './AppointmentActions';

export default function AppointmentCard({ appt, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={s.card}>
      <View style={{ flex:1 }}>
        <Text style={s.title}>{appt.title}</Text>
        <Text style={s.sub}>{new Date(appt.plannedStart).toLocaleTimeString()} · {appt.status}</Text>
      </View>
      <View style={{ minWidth:160 }}>
        <AppointmentActions appt={appt} />
      </View>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  card:{ padding:12, borderRadius:8, backgroundColor:'#fff', marginBottom:10, flexDirection:'row', alignItems:'center', elevation:1 },
  title:{ fontSize:16, fontWeight:'600' },
  sub:{ color:'#666', marginTop:4 }
});
