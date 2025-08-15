import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';

export default function NewCustomerScreen({ navigation }) {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [customerType, setCustomerType] = useState('ACTIVE');
  const [segment, setSegment] = useState('SILVER');
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    if (!name || !company || !email) {
      Alert.alert('Hata', 'Lütfen gerekli alanları doldurun (Ad, Şirket, E-posta)');
      return;
    }

    // Fake API çağrısı
    Alert.alert(
      'Başarılı',
      'Müşteri başarıyla oluşturuldu!',
      [
        {
          text: 'Tamam',
          onPress: () => navigation.goBack()
        }
      ]
    );
  };

  const customerTypes = [
    { key: 'ACTIVE', label: 'Aktif Müşteri', color: '#34C759' },
    { key: 'POTENTIAL', label: 'Potansiyel Müşteri', color: '#FF9500' },
    { key: 'PASSIVE', label: 'Pasif Müşteri', color: '#8E8E93' }
  ];

  const segments = [
    { key: 'PLATINUM', label: 'Platinum', color: '#E5E4E2' },
    { key: 'GOLD', label: 'Gold', color: '#FFD700' },
    { key: 'SILVER', label: 'Silver', color: '#C0C0C0' },
    { key: 'BRONZE', label: 'Bronze', color: '#CD7F32' }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Yeni Müşteri</Text>
        <Text style={styles.headerSubtitle}>Müşteri bilgilerini girin</Text>
      </View>

      <View style={styles.form}>
        {/* Temel Bilgiler */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Temel Bilgiler</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Ad Soyad *</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Müşteri adını girin"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Şirket *</Text>
            <TextInput
              style={styles.input}
              value={company}
              onChangeText={setCompany}
              placeholder="Şirket adını girin"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>E-posta *</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="E-posta adresini girin"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Telefon</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Telefon numarasını girin"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Adres</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={address}
              onChangeText={setAddress}
              placeholder="Adres bilgilerini girin"
              multiline
              numberOfLines={3}
            />
          </View>
        </View>

        {/* Müşteri Türü */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Müşteri Türü</Text>
          <View style={styles.optionsContainer}>
            {customerTypes.map(type => (
              <TouchableOpacity
                key={type.key}
                style={[
                  styles.optionButton,
                  customerType === type.key && styles.optionButtonActive,
                  { borderColor: type.color }
                ]}
                onPress={() => setCustomerType(type.key)}
              >
                <Text style={[
                  styles.optionText,
                  customerType === type.key && styles.optionTextActive
                ]}>
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Müşteri Segmenti */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Müşteri Segmenti</Text>
          <View style={styles.optionsContainer}>
            {segments.map(seg => (
              <TouchableOpacity
                key={seg.key}
                style={[
                  styles.optionButton,
                  segment === seg.key && styles.optionButtonActive,
                  { borderColor: seg.color }
                ]}
                onPress={() => setSegment(seg.key)}
              >
                <Text style={[
                  styles.optionText,
                  segment === seg.key && styles.optionTextActive
                ]}>
                  {seg.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Notlar */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notlar</Text>
          <View style={styles.inputGroup}>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={notes}
              onChangeText={setNotes}
              placeholder="Müşteri hakkında notlar..."
              multiline
              numberOfLines={4}
            />
          </View>
        </View>

        {/* Butonlar */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>İptal</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Kaydet</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666'
  },
  form: {
    padding: 20
  },
  section: {
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16
  },
  inputGroup: {
    marginBottom: 16
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#333'
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top'
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
    minWidth: 100,
    alignItems: 'center'
  },
  optionButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF'
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666'
  },
  optionTextActive: {
    color: '#fff'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginRight: 8,
    alignItems: 'center'
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666'
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    marginLeft: 8,
    alignItems: 'center'
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff'
  }
});
