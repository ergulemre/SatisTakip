import React, { useEffect, useState } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { api } from '../services/api';
import AppointmentCard from '../components/AppointmentCard';

export default function HomeScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const data = await api.getAppointmentsToday();
    setItems(data);
    setLoading(false);
  }
  useEffect(()=>{ load(); }, []);

  return (
    <View style={{flex:1, padding:12}}>
      <FlatList
        data={items}
        keyExtractor={(x)=>x.id}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={load}/>}
        renderItem={({item}) => (
          <AppointmentCard
            appt={item}
            onPress={()=> navigation.navigate('AppointmentDetail', { id:item.id })}
          />
        )}
      />
    </View>
  );
}
