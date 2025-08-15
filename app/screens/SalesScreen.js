import React from 'react';
import { View, Button, Text } from 'react-native';

export default function SalesScreen({ navigation }) {
    console.log(navigation.getState());

  return (
    <View style={{flex:1, padding:12}}>

      <Button title="Yeni Satış" onPress={() => navigation.navigate('NewSale')} />
      <View style={{height:10}}/>
      <Button title="Yeni Tahsilat" onPress={()=>navigation.navigate('Satis', { screen: 'NewCollection' })} />
      <View style={{marginTop:20}}>
        <Text>Burada son satışlar, tahsilatlar ve prim özetleri listelenebilir.</Text>
      </View>
    </View>
  );
}
