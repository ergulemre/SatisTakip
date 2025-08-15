import React, { useState } from 'react';
import { View, Button, FlatList, Text } from 'react-native';

export default function RequestsScreen({ navigation }) {
  const [items,setItems]=useState([]); // mock liste

  return (
    <View style={{flex:1, padding:12}}>
      <Button title="Yeni Talep" onPress={()=>navigation.navigate('NewRequest',{ onCreated:req=>setItems([req,...items]) })} />
      <FlatList
        style={{marginTop:12}}
        data={items}
        keyExtractor={(x,i)=>String(i)}
        renderItem={({item})=>(
          <View style={{padding:12, backgroundColor:'#fff', borderRadius:8, marginBottom:8}}>
            <Text>{item.type}</Text>
            <Text style={{color:'#666'}}>{item.note}</Text>
            <Text>Durum: {item.status || 'PENDING'}</Text>
          </View>
        )}
      />
    </View>
  );
}
