import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { api } from '../services/api';

export default function NewCollectionScreen({ navigation }) {
  const [amount,setAmount]=useState('');
  const [receipt,setReceipt]=useState('');
  const [pdf,setPdf]=useState(null);

  const pickPdf = async () => {
    const res = await DocumentPicker.pickSingle({ type: DocumentPicker.types.pdf });
    setPdf(res);
  };

  const save = async () => {
    const res = await api.createCollection({ amount:Number(amount), receiptNo:receipt, pdfUrl: pdf?.uri });
    Alert.alert('Kaydedildi', `Tahsilat ID: ${res.id}`);
    navigation.goBack();
  };

  return (
    <View style={{flex:1, padding:12}}>
      <Text>Tutar (₺)</Text>
      <TextInput keyboardType="numeric" value={amount} onChangeText={setAmount}
        style={{borderWidth:1,borderColor:'#ccc', borderRadius:8, padding:10, marginBottom:10}}/>
      <Text>Makbuz No</Text>
      <TextInput value={receipt} onChangeText={setReceipt}
        style={{borderWidth:1,borderColor:'#ccc', borderRadius:8, padding:10, marginBottom:10}}/>
      <Button title={pdf?'PDF seçildi':'Makbuz PDF Seç'} onPress={pickPdf} />
      <View style={{height:12}}/>
      <Button title="Kaydet" onPress={save} />
    </View>
  );
}
