import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const SignupScreen = ({ navigation }) => {
  // State variables to capture user input
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  const handleSignup = async () => {
    try {
      // Send POST request to backend
      const response = await axios.post('http://localhost:8080/signup', {
        name,
        email,
        password,
      });

      // Check if signup was successful
      if (response.status === 200) {
        Alert.alert('Success', 'Account created successfully');
        navigation.navigate('Login'); // Navigate to login screen after successful signup
      }
    } catch (error) {
      console.error('Error during signup:', error);
      Alert.alert('Error', 'Failed to create account. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create new Account</Text>
      <Text
        style={styles.subHeader}
        onPress={() => navigation.navigate('Login')}
      >
        Already Registered? Log in here.
      </Text>

      <TextInput
        placeholder="Name"
        placeholderTextColor="#aaa"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor="#aaa"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#3c5470',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 16,
    color: '#77c7f7',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#5d759f',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginVertical: 8,
  },
  button: {
    backgroundColor: '#42b8d3',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SignupScreen;

