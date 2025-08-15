import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { api } from '../services/api';

export default function AdminDashboardScreen() {
  const [today, setToday] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await api.getAppointmentsToday();
      setToday(data);
    })();
  }, []);

  return (
    <View style={{flex:1, padding:12}}>
      <Text style={{fontSize:18, fontWeight:'700', marginBottom:8}}>Bugünkü Randevular</Text>
      <FlatList
        data={today}
        keyExtractor={(x)=>x.id}
        renderItem={({item})=>(
          <View style={{padding:10, backgroundColor:'#fff', borderRadius:8, marginBottom:8}}>
            <Text style={{fontWeight:'600'}}>{item.title}</Text>
            <Text style={{color:'#666'}}>{item.status}</Text>
          </View>
        )}
      />
      <Text style={{marginTop:16}}>Bekleyen talepler, takım sıralaması ve geciken randevular burada toplanabilir.</Text>
    </View>
  );
}
