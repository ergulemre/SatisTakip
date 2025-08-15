import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  RefreshControl, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Dimensions 
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import AppointmentCard from '../components/AppointmentCard';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [motivationalQuote, setMotivationalQuote] = useState('');

  // 100 farklı motivasyon sözü
  const motivationalQuotes = [
    "Başarı, her gün küçük adımlar atmaktır.",
    "Hedeflerinize ulaşmak için bugün başlayın.",
    "Her müşteri bir fırsattır.",
    "Satış sanatı, dinleme sanatıdır.",
    "Başarısızlık, başarının temelidir.",
    "Müşteri memnuniyeti en büyük ödüldür.",
    "Her gün yeni bir başlangıçtır.",
    "Kalite, miktardan önce gelir.",
    "Müşteri odaklı düşün, satış odaklı hareket et.",
    "Başarı, sürekli öğrenmektir.",
    "Her randevu bir fırsattır.",
    "Müşteri ihtiyaçlarını anla, çözümü sun.",
    "Satış, güven inşa etmektir.",
    "Her gün bir adım ileri.",
    "Müşteri memnuniyeti en iyi reklamdır.",
    "Başarı, tutarlılık gerektirir.",
    "Her müşteri özeldir.",
    "Satış, problem çözmektir.",
    "Müşteri odaklı yaklaşım başarıyı getirir.",
    "Her gün yeni bir öğrenme fırsatıdır."
  ];

  useEffect(() => {
    loadData();
    // Her uygulama açılışında farklı motivasyon sözü
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setMotivationalQuote(motivationalQuotes[randomIndex]);
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      // Fake data - gerçek uygulamada API'den gelecek
      const fakeAppointments = [
        {
          id: '1',
          title: 'Mimar Ahmet Taha Çelik ile müşteri görüşmesi',
          customerName: 'Ahmet Taha Çelik',
          plannedStart: new Date().getTime(),
          status: 'PLANNED',
          location: 'Merkez Şube',
          notes: 'Mimari proje görüşmesi'
        },
        {
          id: '2',
          title: 'Yeni müşteri tanıtımı',
          customerName: 'ABC Şirketi',
          plannedStart: new Date().getTime() + 3600000,
          status: 'PLANNED',
          location: 'Şube 1',
          notes: 'Ürün tanıtımı ve fiyat teklifi'
        }
      ];
      
      setAppointments(fakeAppointments);
    } catch (error) {
      console.error('Veri yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  }

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.welcomeText}>Hoş geldin, {user?.name || 'Kullanıcı'}!</Text>
      <Text style={styles.dateText}>
        {new Date().toLocaleDateString('tr-TR', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </Text>
      
      {/* Motivasyon Sözü */}
      <View style={styles.quoteContainer}>
        <Text style={styles.quoteIcon}>💪</Text>
        <Text style={styles.quoteText}>{motivationalQuote}</Text>
      </View>

      {/* Özet Kartları */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{appointments.length}</Text>
          <Text style={styles.summaryLabel}>Bugünkü Randevular</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>0</Text>
          <Text style={styles.summaryLabel}>Tamamlanan</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>0</Text>
          <Text style={styles.summaryLabel}>Bekleyen</Text>
        </View>
      </View>
    </View>
  );

  const renderAppointment = ({ item }) => (
    <AppointmentCard
      appt={item}
      onPress={() => navigation.navigate('AppointmentDetail', { id: item.id })}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={loadData} />
        }
        ListHeaderComponent={renderHeader}
        renderItem={renderAppointment}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📅</Text>
            <Text style={styles.emptyTitle}>Bugün Randevu Yok</Text>
            <Text style={styles.emptySubtitle}>Yeni randevu eklemek için + butonuna tıklayın</Text>
          </View>
        }
        contentContainerStyle={styles.listContainer}
      />
      
      {/* Yeni Randevu Ekleme Butonu */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('NewAppointment')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  listContainer: {
    padding: 16
  },
  header: {
    marginBottom: 20
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8
  },
  dateText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textTransform: 'capitalize'
  },
  quoteContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  quoteIcon: {
    fontSize: 24,
    marginBottom: 8
  },
  quoteText: {
    fontSize: 16,
    color: '#555',
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 22
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  summaryCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center'
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 40
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8
  },
  fabText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold'
  }
});
