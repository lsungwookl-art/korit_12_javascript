import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ScannerScreen from './screens/ScannerScreen';
import AddProductScreen from './screens/AddProductScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: '🐾 펫샵 재고현황' }} />
        <Stack.Screen name="Scanner" component={ScannerScreen} options={{ title: '바코드 스캔' }} />
        <Stack.Screen name="AddProduct" component={AddProductScreen} options={{ title: '신규 상품 등록' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}