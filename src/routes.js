import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'

import Clientes from './pages/Clientes'
import Produtos from './pages/Produtos'
import ListDividaCliente from './pages/ListDividaCliente'
import AvCliente from './pages/AvCliente'

import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

AntDesign.loadFont()
MaterialCommunityIcons.loadFont()

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()
function Tabs() {
  return (
    <Tab.Navigator tabBarOptions={{
      activeTintColor: '#3AE2F0',
      inactiveTintColor: '#000',
      //activeBackgroundColor: '#999',
      showLabel: false,
      style:{
        borderTopColor: 'transparent',
        marginTop: -20,
        zIndex: -1
      }
    }}>
      <Tab.Screen name="Clientes" component={Clientes}  options={{ 
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons name='clipboard-text' size={35} color={color} />
        )
      }}/>
      <Tab.Screen name="Produtos" component={Produtos} options={{
        tabBarIcon: ({color}) => (
          <AntDesign name='shoppingcart' size={35} color={color} />
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