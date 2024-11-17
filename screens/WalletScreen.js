import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'; // Make sure to install Ionicons

const WalletScreen = ({ navigation }) => {
  const balance = 300.0; // Replace with dynamic balance data

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Profile')}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Wallet Icon */}
      <View style={styles.walletIconContainer}>
        <Ionicons name="wallet" size={100} color="#FFD700" />
      </View>

      {/* Wallet Balance */}
      <Text style={styles.title}>Your Wallet Balance</Text>
      <Text style={styles.balanceText}>₹{balance.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3c5470',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: '#3c5470',
    padding: 8,
    borderRadius: 50,
  },
  walletIconContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  balanceText: {
    fontSize: 36,
    color: '#FFD700',
    fontWeight: 'bold',
  },
});

export default WalletScreen;
