import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';
import { api } from '../services/api';

export default function CustomersScreen({ navigation }) {
  const [q,setQ]=useState('');
  const [items,setItems]=useState([]);

  const load = async (s='') => {
    const data = await api.getCustomers(s);
    setItems(data);
  };
  useEffect(()=>{ load(); }, []);

  return (
    <View style={{flex:1, padding:12}}>
      <TextInput placeholder="Ara..." value={q} onChangeText={setQ}
        onSubmitEditing={()=>load(q)}
        style={{borderWidth:1, borderColor:'#ccc', borderRadius:8, padding:10, marginBottom:10}}
      />
      <FlatList
        data={items}
        keyExtractor={(x)=>x.id}
        renderItem={({item}) => (
          <TouchableOpacity onPress={()=>navigation.navigate('CustomerDetail',{id:item.id})}
            style={{padding:12, backgroundColor:'#fff', borderRadius:8, marginBottom:8}}>
            <Text style={{fontWeight:'600'}}>{item.name}</Text>
            <Text style={{color:'#666'}}>{item.segment}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
