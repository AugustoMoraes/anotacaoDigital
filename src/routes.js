import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Clientes from './pages/Clientes'
import Produtos from './pages/Produtos'
import ListDividaCliente from './pages/ListDividaCliente'
import AvCliente from './pages/AvCliente'

const Stack = createStackNavigator()

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Clientes" component={Clientes} />
        <Stack.Screen name="Produtos" component={Produtos} />
        <Stack.Screen name="ListDividaCliente" component={ListDividaCliente} />
        <Stack.Screen name="AvCliente" component={AvCliente} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}