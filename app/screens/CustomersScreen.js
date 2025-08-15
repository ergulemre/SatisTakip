import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView
} from 'react-native';

export default function CustomersScreen({ navigation }) {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('ALL');

  useEffect(() => {
    loadCustomers();
  }, []);

  useEffect(() => {
    filterCustomers();
  }, [searchText, selectedFilter, customers]);

  const loadCustomers = () => {
    // Fake data - gerçek uygulamada API'den gelecek
    const fakeCustomers = [
      {
        id: '1',
        name: 'Ahmet Taha Çelik',
        type: 'ACTIVE',
        segment: 'PLATINUM',
        email: 'ahmet@example.com',
        phone: '+90 555 123 4567',
        company: 'Çelik Mimarlık',
        lastContact: new Date().getTime() - 86400000, // 1 gün önce
        totalSales: 150000
      },
      {
        id: '2',
        name: 'Fatma Yılmaz',
        type: 'POTENTIAL',
        segment: 'GOLD',
        email: 'fatma@example.com',
        phone: '+90 555 987 6543',
        company: 'Yılmaz İnşaat',
        lastContact: new Date().getTime() - 172800000, // 2 gün önce
        totalSales: 0
      },
      {
        id: '3',
        name: 'Mehmet Demir',
        type: 'PASSIVE',
        segment: 'SILVER',
        email: 'mehmet@example.com',
        phone: '+90 555 456 7890',
        company: 'Demir Ticaret',
        lastContact: new Date().getTime() - 604800000, // 1 hafta önce
        totalSales: 25000
      }
    ];
    
    setCustomers(fakeCustomers);
  };

  const filterCustomers = () => {
    let filtered = customers;

    // Tür filtresi
    if (selectedFilter !== 'ALL') {
      filtered = filtered.filter(customer => customer.type === selectedFilter);
    }

    // Arama filtresi
    if (searchText) {
      filtered = filtered.filter(customer =>
        customer.name.toLowerCase().includes(searchText.toLowerCase()) ||
        customer.company.toLowerCase().includes(searchText.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredCustomers(filtered);
  };

  const getCustomerTypeText = (type) => {
    switch (type) {
      case 'ACTIVE': return 'Aktif Müşteri';
      case 'POTENTIAL': return 'Potansiyel Müşteri';
      case 'PASSIVE': return 'Pasif Müşteri';
      default: return type;
    }
  };

  const getCustomerTypeColor = (type) => {
    switch (type) {
      case 'ACTIVE': return '#34C759';
      case 'POTENTIAL': return '#FF9500';
      case 'PASSIVE': return '#8E8E93';
      default: return '#8E8E93';
    }
  };

  const getSegmentText = (segment) => {
    switch (segment) {
      case 'PLATINUM': return 'Platinum';
      case 'GOLD': return 'Gold';
      case 'SILVER': return 'Silver';
      case 'BRONZE': return 'Bronze';
      default: return segment;
    }
  };

  const getSegmentColor = (segment) => {
    switch (segment) {
      case 'PLATINUM': return '#E5E4E2';
      case 'GOLD': return '#FFD700';
      case 'SILVER': return '#C0C0C0';
      case 'BRONZE': return '#CD7F32';
      default: return '#8E8E93';
    }
  };

  const renderCustomer = ({ item }) => (
    <TouchableOpacity
      style={styles.customerCard}
      onPress={() => navigation.navigate('CustomerDetail', { id: item.id })}
    >
      <View style={styles.customerHeader}>
        <View style={styles.customerInfo}>
          <Text style={styles.customerName}>{item.name}</Text>
          <Text style={styles.customerCompany}>{item.company}</Text>
        </View>
        <View style={styles.badgesContainer}>
          <View style={[styles.typeBadge, { backgroundColor: getCustomerTypeColor(item.type) }]}>
            <Text style={styles.badgeText}>{getCustomerTypeText(item.type)}</Text>
          </View>
          <View style={[styles.segmentBadge, { backgroundColor: getSegmentColor(item.segment) }]}>
            <Text style={styles.segmentText}>{getSegmentText(item.segment)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.customerDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailIcon}>📧</Text>
          <Text style={styles.detailText}>{item.email}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailIcon}>📱</Text>
          <Text style={styles.detailText}>{item.phone}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailIcon}>💰</Text>
          <Text style={styles.detailText}>
            Toplam Satış: ₺{item.totalSales.toLocaleString()}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailIcon}>📅</Text>
          <Text style={styles.detailText}>
            Son İletişim: {new Date(item.lastContact).toLocaleDateString('tr-TR')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderFilterButtons = () => (
    <View style={styles.filterContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {[
          { key: 'ALL', label: 'Tümü' },
          { key: 'ACTIVE', label: 'Aktif' },
          { key: 'POTENTIAL', label: 'Potansiyel' },
          { key: 'PASSIVE', label: 'Pasif' }
        ].map(filter => (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.filterButton,
              selectedFilter === filter.key && styles.filterButtonActive
            ]}
            onPress={() => setSelectedFilter(filter.key)}
          >
            <Text style={[
              styles.filterButtonText,
              selectedFilter === filter.key && styles.filterButtonTextActive
            ]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Müşteriler</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('NewCustomer')}
        >
          <Text style={styles.addButtonText}>+ Yeni Müşteri</Text>
        </TouchableOpacity>
      </View>

      {/* Arama */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Müşteri ara..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Filtreler */}
      {renderFilterButtons()}

      {/* Müşteri Listesi */}
      <FlatList
        data={filteredCustomers}
        keyExtractor={(item) => item.id}
        renderItem={renderCustomer}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>👥</Text>
            <Text style={styles.emptyTitle}>Müşteri Bulunamadı</Text>
            <Text style={styles.emptySubtitle}>
              {searchText ? 'Arama kriterlerinize uygun müşteri yok' : 'Henüz müşteri eklenmemiş'}
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333'
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600'
  },
  searchContainer: {
    padding: 20,
    paddingBottom: 10
  },
  searchInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16
  },
  filterContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF'
  },
  filterButtonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500'
  },
  filterButtonTextActive: {
    color: '#fff'
  },
  listContainer: {
    padding: 20
  },
  customerCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4
  },
  customerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16
  },
  customerInfo: {
    flex: 1
  },
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4
  },
  customerCompany: {
    fontSize: 14,
    color: '#666'
  },
  badgesContainer: {
    alignItems: 'flex-end'
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 8
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600'
  },
  segmentBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20
  },
  segmentText: {
    color: '#333',
    fontSize: 12,
    fontWeight: '600'
  },
  customerDetails: {
    gap: 8
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  detailIcon: {
    fontSize: 16,
    marginRight: 8,
    width: 20
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    flex: 1
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
  }
});
