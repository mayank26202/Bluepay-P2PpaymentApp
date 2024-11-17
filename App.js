import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import WalletScreen from './screens/WalletScreen';
import LandingPage from './screens/LandingPage';
import ProfilePage from './screens/ProfilePage';
import AddToWalletPage from './screens/AddToWallet';

const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Landing">
    <Stack.Screen name="Landing" component={LandingPage} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Wallet" component={WalletScreen} />
      <Stack.Screen name='Profile' component={ProfilePage} />
      <Stack.Screen name='AddToWallet' component={AddToWalletPage} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
