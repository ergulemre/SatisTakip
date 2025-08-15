import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../context/AuthContext';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import AppointmentDetailScreen from '../screens/AppointmentDetailScreen';
import CustomersScreen from '../screens/CustomersScreen';
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

function SalesTabs() {
  const HomeStack = () => (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Günüm' }} />
      <Stack.Screen name="AppointmentDetail" component={AppointmentDetailScreen} options={{ title: 'Randevu' }} />
    </Stack.Navigator>
  );

  const CustomersStack = () => (
    <Stack.Navigator>
      <Stack.Screen name="Customers" component={CustomersScreen} options={{ title: 'Müşteriler' }} />
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
    <Tab.Navigator screenOptions={{ headerShown:false }}>
      <Tab.Screen name="Gunum" component={HomeStack} options={{ title: 'Günüm' }} />
      <Tab.Screen name="Musteriler" component={CustomersStack} options={{ title: 'Müşteriler' }} />
      <Tab.Screen name="Talepler" component={RequestsStack} options={{ title: 'Talepler' }} />
      <Tab.Screen name="Satis" component={SalesStack} options={{ title: 'Satış' }} />
      <Tab.Screen name="Profil" component={ProfileStack} options={{ title: 'Profil' }} />
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
  if (loading) return null;
  return (
    <Stack.Navigator screenOptions={{ headerShown:false }}>
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
