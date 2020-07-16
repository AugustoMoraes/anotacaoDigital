import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack'

import Clientes from './pages/Clientes'
import Produtos from './pages/Produtos'
import ListDividaCliente from './pages/ListDividaCliente'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()
function Tabs(){
  return(
    <Tab.Navigator>
      <Tab.Screen name="Clientes" component={Clientes} />
      <Tab.Screen name="Produtos" component={Produtos} />
    </Tab.Navigator>
  )
}
export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Clientes" component={Tabs}/>
        <Stack.Screen name="ListDividaCliente" component={ListDividaCliente}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}