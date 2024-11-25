import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import RazorpayCheckout from 'react-native-razorpay';
import axios from 'axios';

const AddToWalletPage = ({ navigation }) => {
  const [amount, setAmount] = useState('');

  const handleAddMoney = async () => {
    if (!amount || isNaN(amount)) {
      Alert.alert('Invalid Input', 'Please enter a valid amount.');
      return;
    }
    if (parseInt(amount) > 10000) {
      Alert.alert('Limit Exceeded', 'The maximum amount you can add is ₹10,000.');
      return;
    }

    try {
      // Step 1: Create an order on your backend
      const orderResponse = await axios.post('http://localhost:8080/create-order', {
        amount: parseInt(amount) * 100, // Amount in paise
      });

      if (!orderResponse.data.id) {
        Alert.alert('Error', 'Unable to create order. Please try again.');
        return;
      }

      // Step 2: Razorpay payment initiation
      const options = {
        description: 'Add Money to Wallet',
        image: 'https://example.com/your_logo', // Replace with your logo URL
        currency: 'INR',
        key: 'rzp_test_ZsQ10yKgHqSgCi', // Use environment variable for your Razorpay key
        amount: parseInt(amount) * 100, // Amount in paise
        name: 'BluePay',
        order_id: orderResponse.data.id, // Razorpay order ID from backend
        prefill: {
          email: 'user@example.com', // Replace with actual user data
          contact: '9876543210',     // Replace with actual user data
          name: 'User Name',         // Replace with actual user data
        },
        theme: { color: '#00bcd4' },
      };


    
      

      // Open Razorpay checkout
      RazorpayCheckout.open(options)
        .then(async (data) => {
          const paymentData = {
            razorpay_order_id: data.razorpay_order_id,
            razorpay_payment_id: data.razorpay_payment_id,
            razorpay_signature: data.razorpay_signature,
            userId: '12345',
            amount: parseInt(amount),
          };

          const verifyResponse = await axios.post('http://localhost:8080/verify', paymentData);

          if (verifyResponse.data.success) {
            Alert.alert(
              'Success',
              `₹${amount} added to your wallet! Current Balance: ₹${verifyResponse.data.balance}`
            );
          } else {
            Alert.alert('Error', 'Payment verification failed. Please contact support.');
          }
        })
        .catch((error) => {
          console.error('Payment Failed:', error);
          Alert.alert('Payment Failed', error.description || 'An error occurred during payment.');
        });
    } catch (err) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
      console.log(err);
    }
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


