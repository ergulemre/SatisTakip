import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Dimensions,
  Image
} from 'react-native';
import { useAuth } from '../context/AuthContext';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const [selectedTab, setSelectedTab] = useState('profile');

  const handleLogout = () => {
    Alert.alert(
      'Çıkış Yap',
      'Hesabınızdan çıkmak istediğinizden emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        { text: 'Çıkış Yap', onPress: logout }
      ]
    );
  };

  const getRoleText = (role) => {
    switch (role) {
      case 'ADMIN': return 'Yönetici';
      case 'MANAGER': return 'Müdür';
      case 'SALES': return 'Satış Temsilcisi';
      default: return role;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'ADMIN': return '#FF3B30';
      case 'MANAGER': return '#FF9500';
      case 'SALES': return '#007AFF';
      default: return '#8E8E93';
    }
  };

  const renderProfileTab = () => (
    <View style={styles.tabContent}>
      {/* Profil Kartı */}
      <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
            </Text>
          </View>
          <View style={styles.onlineIndicator} />
        </View>
        
        <View style={styles.profileInfo}>
          <Text style={styles.userName}>{user?.name || 'Kullanıcı'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'email@example.com'}</Text>
          <View style={[styles.roleBadge, { backgroundColor: getRoleColor(user?.role) }]}>
            <Text style={styles.roleText}>{getRoleText(user?.role)}</Text>
          </View>
        </View>
      </View>

      {/* İstatistikler */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>24</Text>
          <Text style={styles.statLabel}>Bu Ay Randevu</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Tamamlanan</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>₺45K</Text>
          <Text style={styles.statLabel}>Toplam Satış</Text>
        </View>
      </View>

      {/* Hızlı Erişim */}
      <View style={styles.quickAccessContainer}>
        <Text style={styles.sectionTitle}>Hızlı Erişim</Text>
        <View style={styles.quickAccessGrid}>
          <TouchableOpacity style={styles.quickAccessItem}>
            <View style={[styles.quickAccessIcon, { backgroundColor: '#34C759' }]}>
              <Text style={styles.quickAccessIconText}>📅</Text>
            </View>
            <Text style={styles.quickAccessText}>Randevularım</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickAccessItem}>
            <View style={[styles.quickAccessIcon, { backgroundColor: '#007AFF' }]}>
              <Text style={styles.quickAccessIconText}>👥</Text>
            </View>
            <Text style={styles.quickAccessText}>Müşterilerim</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickAccessItem}>
            <View style={[styles.quickAccessIcon, { backgroundColor: '#FF9500' }]}>
              <Text style={styles.quickAccessIconText}>💰</Text>
            </View>
            <Text style={styles.quickAccessText}>Komisyonlar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickAccessItem}>
            <View style={[styles.quickAccessIcon, { backgroundColor: '#AF52DE' }]}>
              <Text style={styles.quickAccessIconText}>📊</Text>
            </View>
            <Text style={styles.quickAccessText}>Raporlar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderSettingsTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.settingsContainer}>
        <Text style={styles.sectionTitle}>Ayarlar</Text>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingIcon}>🔔</View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>Bildirimler</Text>
            <Text style={styles.settingSubtitle}>Randevu ve güncelleme bildirimleri</Text>
          </View>
          <View style={styles.settingArrow}>›</View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingIcon}>🌍</View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>Dil</Text>
            <Text style={styles.settingSubtitle}>Türkçe</Text>
          </View>
          <View style={styles.settingArrow}>›</View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingIcon}>🔒</View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>Gizlilik</Text>
            <Text style={styles.settingSubtitle}>Veri kullanımı ve güvenlik</Text>
          </View>
          <View style={styles.settingArrow}>›</View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingIcon}>❓</View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>Yardım</Text>
            <Text style={styles.settingSubtitle}>SSS ve destek</Text>
          </View>
          <View style={styles.settingArrow}>›</View>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profil</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Çıkış</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Butonları */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'profile' && styles.tabButtonActive]}
          onPress={() => setSelectedTab('profile')}
        >
          <Text style={[styles.tabButtonText, selectedTab === 'profile' && styles.tabButtonTextActive]}>
            Profil
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'settings' && styles.tabButtonActive]}
          onPress={() => setSelectedTab('settings')}
        >
          <Text style={[styles.tabButtonText, selectedTab === 'settings' && styles.tabButtonTextActive]}>
            Ayarlar
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab İçeriği */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedTab === 'profile' ? renderProfileTab() : renderSettingsTab()}
      </ScrollView>
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
    paddingTop: 40,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333'
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600'
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 4
  },
  tabButtonActive: {
    backgroundColor: '#007AFF'
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666'
  },
  tabButtonTextActive: {
    color: '#fff'
  },
  content: {
    flex: 1
  },
  tabContent: {
    padding: 20
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative'
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff'
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#34C759',
    borderWidth: 3,
    borderColor: '#fff'
  },
  profileInfo: {
    alignItems: 'center'
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16
  },
  roleBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20
  },
  roleText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600'
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center'
  },
  quickAccessContainer: {
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16
  },
  quickAccessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  quickAccessItem: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: (width - 60) / 2,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4
  },
  quickAccessIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12
  },
  quickAccessIconText: {
    fontSize: 24
  },
  quickAccessText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center'
  },
  settingsContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  settingIcon: {
    fontSize: 24,
    marginRight: 16,
    width: 30
  },
  settingContent: {
    flex: 1
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#666'
  },
  settingArrow: {
    fontSize: 18,
    color: '#999',
    fontWeight: '300'
  }
});
