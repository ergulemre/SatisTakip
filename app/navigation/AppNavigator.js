import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import NewAppointmentScreen from '../screens/NewAppointmentScreen';
import AppointmentDetailScreen from '../screens/AppointmentDetailScreen';
import CustomersScreen from '../screens/CustomersScreen';
import NewCustomerScreen from '../screens/NewCustomerScreen';
import CustomerDetailScreen from '../screens/CustomerDetailScreen';
import RequestsScreen from '../screens/RequestsScreen';
import NewRequestScreen from '../screens/NewRequestScreen';
import SalesScreen from '../screens/SalesScreen';
import NewSaleScreen from '../screens/NewSaleScreen';
import NewCollectionScreen from '../screens/NewCollectionScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AdminDashboardScreen from '../screens/AdminDashboardScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Loading Screen Component
function LoadingScreen() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#007AFF" />
      <Text style={styles.loadingText}>Yükleniyor...</Text>
    </View>
  );
}

function SalesTabs() {
  const HomeStack = () => (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Günüm' }} />
      <Stack.Screen name="NewAppointment" component={NewAppointmentScreen} options={{ title: 'Yeni Randevu' }} />
      <Stack.Screen name="AppointmentDetail" component={AppointmentDetailScreen} options={{ title: 'Randevu' }} />
    </Stack.Navigator>
  );

  const CustomersStack = () => (
    <Stack.Navigator>
      <Stack.Screen name="Customers" component={CustomersScreen} options={{ title: 'Müşteriler' }} />
      <Stack.Screen name="NewCustomer" component={NewCustomerScreen} options={{ title: 'Yeni Müşteri' }} />
      <Stack.Screen name="CustomerDetail" component={CustomerDetailScreen} options={{ title: 'Müşteri' }} />
    </Stack.Navigator>
  );

  const RequestsStack = () => (
    <Stack.Navigator>
      <Stack.Screen name="Requests" component={RequestsScreen} options={{ title: 'Talepler' }} />
      <Stack.Screen name="NewRequest" component={NewRequestScreen} options={{ title: 'Yeni Talep' }} />
    </Stack.Navigator>
  );

  const SalesStack = () => (
    <Stack.Navigator>
      <Stack.Screen name="Sales" component={SalesScreen} options={{ title: 'Satış/Tahsilat' }} />
      <Stack.Screen name="NewSale" component={NewSaleScreen} options={{ title: 'Yeni Satış' }} />
      <Stack.Screen name="NewCollection" component={NewCollectionScreen} options={{ title: 'Yeni Tahsilat' }} />
    </Stack.Navigator>
  );

  const ProfileStack = () => (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profil' }} />
    </Stack.Navigator>
  );

  return (
    <Tab.Navigator 
      screenOptions={{ 
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93'
      }}
    >
      <Tab.Screen 
        name="Gunum" 
        component={HomeStack} 
        options={{ 
          title: 'Günüm',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>📅</Text>
          )
        }} 
      />
      <Tab.Screen 
        name="Musteriler" 
        component={CustomersStack} 
        options={{ 
          title: 'Müşteriler',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>👥</Text>
          )
        }} 
      />
      <Tab.Screen 
        name="Talepler" 
        component={RequestsStack} 
        options={{ 
          title: 'Talepler',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>📋</Text>
          )
        }} 
      />
      <Tab.Screen 
        name="Satis" 
        component={SalesStack} 
        options={{ 
          title: 'Satış',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>💰</Text>
          )
        }} 
      />
      <Tab.Screen 
        name="Profil" 
        component={ProfileStack} 
        options={{ 
          title: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>👤</Text>
          )
        }} 
      />
    </Tab.Navigator>
  );
}

function AdminTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="AdminDashboard" component={AdminDashboardScreen} options={{ title: 'Yönetim' }} />
      <Tab.Screen name="Reports" component={SalesScreen} options={{ title: 'Raporlar' }} />
      <Tab.Screen name="Profil" component={ProfileScreen} options={{ title: 'Profil' }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingScreen />;
  }
  
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : user.role === 'ADMIN' || user.role === 'MANAGER' ? (
        <Stack.Screen name="Admin" component={AdminTabs} />
      ) : (
        <Stack.Screen name="Sales" component={SalesTabs} />
      )}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666'
  }
});
