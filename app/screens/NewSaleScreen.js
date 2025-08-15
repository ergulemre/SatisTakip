import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { api } from '../services/api';

export default function NewSaleScreen({ navigation }) {
  const [amount,setAmount]=useState('');
  const [invoice,setInvoice]=useState('');
  const [pdf,setPdf]=useState(null);

  const pickPdf = async () => {
    const res = await DocumentPicker.pickSingle({ type: DocumentPicker.types.pdf });
    setPdf(res);
  };

  const save = async () => {
    const payload = { amount: Number(amount), invoiceNo: invoice, pdfUrl: pdf?.uri };
    const res = await api.createSale(payload);
    Alert.alert('Kaydedildi', `Prim: ${res.commission?.toFixed?.(2) || '-'}`);
    navigation.goBack();
  };

  return (
    <View style={{flex:1, padding:12}}>
      <Text>Tutar (₺)</Text>
      <TextInput keyboardType="numeric" value={amount} onChangeText={setAmount}
        style={{borderWidth:1,borderColor:'#ccc', borderRadius:8, padding:10, marginBottom:10}}/>
      <Text>Fatura No</Text>
      <TextInput value={invoice} onChangeText={setInvoice}
        style={{borderWidth:1,borderColor:'#ccc', borderRadius:8, padding:10, marginBottom:10}}/>
      <Button title={pdf?'PDF seçildi':'Fatura PDF Seç'} onPress={pickPdf} />
      <View style={{height:12}}/>
      <Button title="Kaydet" onPress={save} />
    </View>
  );
}
