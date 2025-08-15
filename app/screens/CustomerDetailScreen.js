import React from 'react';
import { View, Text } from 'react-native';

export default function CustomerDetailScreen({ route }) {
  const { id } = route.params;
  return (
    <View style={{flex:1, padding:12}}>
      <Text style={{fontSize:18, fontWeight:'700'}}>Müşteri #{id}</Text>
      <Text style={{marginTop:8}}>Geçmiş randevular, satışlar ve notlar burada listelenebilir.</Text>
    </View>
  );
}
