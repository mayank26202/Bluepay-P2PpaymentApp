import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'; // Make sure to install Ionicons

const AddToWalletPage = ({ navigation }) => {
  const [amount, setAmount] = useState('');

  const handleAddMoney = () => {
    if (!amount || isNaN(amount)) {
      Alert.alert('Invalid Input', 'Please enter a valid amount.');
      return;
    }
    if (parseInt(amount) > 10000) {
      Alert.alert('Limit Exceeded', 'The maximum amount you can add is ₹10,000.');
      return;
    }
    // Navigate to payment gateway (to be integrated later)
    Alert.alert('Redirecting', `Adding ₹${amount} to your wallet.`);
    navigation.navigate('PaymentGateway'); // Replace 'PaymentGateway' with the actual route
  };

  return (
    <View style={styles.container}>
        <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Profile')}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      {/* Header */}
      <Text style={styles.headerText}>Add money to your Wallet</Text>

      {/* Wallet Info */}
      <Text style={styles.infoText}>Maximum Add Amount: ₹10,000</Text>

      {/* Input Field */}
      <TextInput
        style={styles.input}
        placeholder="Enter amount to add"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={amount}
        onChangeText={(text) => setAmount(text)}
      />

      {/* Add Money Button */}
      <TouchableOpacity style={styles.button} onPress={handleAddMoney}>
        <Text style={styles.buttonText}>Add Money</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#3c5470',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: '#3c5470',
    padding: 8,
    borderRadius: 50,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 100,
  },
  infoText: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#ffffff',
    width: '80%',
    padding: 10,
    borderRadius: 8,
    fontSize: 18,
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#00bcd4',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    width: '60%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default AddToWalletPage;
