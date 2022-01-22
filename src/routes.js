import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'

import Clientes from './pages/Clientes'
import Produtos from './pages/Produtos'
import ListDividaCliente from './pages/ListDividaCliente'
import AvCliente from './pages/AvCliente'

import Ionicons from 'react-native-vector-icons/Ionicons'
Ionicons.loadFont()
const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()
function Tabs() {
  return (
    <Tab.Navigator tabBarOptions={{
      activeTintColor: '#fff',
      inactiveTintColor: '#000',
      activeBackgroundColor: '#999',
      showLabel: false,
    }}>
      //Teste git 
      <Tab.Screen name="Clientes" component={Clientes} options={{ 
        tabBarIcon: () => (
          <Ionicons name='people' size={50} color='#000' />
        )
      }} />
      <Tab.Screen name="Produtos" component={Produtos} options={{
        tabBarIcon: () => (
          <Ionicons name='cart' size={50} color='#000' />
        )
      }} />
    </Tab.Navigator>
  )
}
export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Clientes" component={Tabs} />
        <Stack.Screen name="ListDividaCliente" component={ListDividaCliente} />
        <Stack.Screen name="AvCliente" component={AvCliente} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}