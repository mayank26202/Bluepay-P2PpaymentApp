import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const WalletScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Your Wallet</Text>
      <Text>Your balance: $0.00</Text>
      {/* Additional features for sending, receiving, and transaction history will go here */}
      <Button title="Logout" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 16 },
});

export default WalletScreen;
