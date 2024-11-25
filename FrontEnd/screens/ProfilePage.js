import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import axios from 'axios';

const ProfilePage = ({ navigation }) => {
  const userName = "John Felix"; // Replace with dynamic user data
  const userId = "user12345"; // Replace with unique user ID

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Logout", 
          onPress: async () => {
            try {
              const response = await axios.post(
                'https://your-backend-url.com/api/logout',
                {}, 
                { headers: { Authorization: `Bearer YOUR_TOKEN_HERE` } } // Replace YOUR_TOKEN_HERE with actual token
              );
              
              if (response.status === 200) {
                // Navigate to the login page
                navigation.replace("Login");
              } else {
                Alert.alert("Logout Failed", "Unable to logout. Please try again.");
              }
            } catch (error) {
              console.error("Logout Error: ", error);
              Alert.alert("Error", "Something went wrong. Please try again.");
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* User Info Section */}
      <Text style={styles.heading}>Welcome, {userName}</Text>
      <View style={styles.qrContainer}>
        <QRCode value={userId} size={150} />
        <Text style={styles.qrLabel}>Your QR Code</Text>
      </View>

      {/* Action Buttons */}
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => navigation.navigate("SendMoneyPage")}
      >
        <Text style={styles.buttonText}>Send Money</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => navigation.navigate("AddToWallet")}
      >
        <Text style={styles.buttonText}>Add to Wallet</Text>
      </TouchableOpacity>

      {/* Account Balance Section */}
      <TouchableOpacity
        style={styles.balanceButton}
        onPress={() => navigation.navigate("Wallet")}
      >
        <Text style={styles.balanceText}>Show Account Balance</Text>
      </TouchableOpacity>

      {/* Transaction History */}
      <Text style={styles.transactionHeading}>Recent Transactions</Text>
      <ScrollView style={styles.transactionList}>
        <View style={styles.transactionItem}>
          <Text style={styles.transactionText}>From: Alice - ₹500</Text>
          <Text style={styles.transactionDate}>16 Nov 2024</Text>
        </View>
        <View style={styles.transactionItem}>
          <Text style={styles.transactionText}>To: Bob - ₹300</Text>
          <Text style={styles.transactionDate}>15 Nov 2024</Text>
        </View>
        <View style={styles.transactionItem}>
          <Text style={styles.transactionText}>From: Cyan - ₹100</Text>
          <Text style={styles.transactionDate}>14 Nov 2024</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3c5470",
    padding: 20,
  },
  logoutButton: {
    position: "absolute",
    top: 250,
    right: 20,
    backgroundColor: "#f44336",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },
  heading: {
    fontSize: 24,
    color: "#ffffff",
    textAlign: "center",
    marginVertical: 20,
  },
  qrContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  qrLabel: {
    color: "#ffffff",
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: "#42b8d3",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  balanceButton: {
    backgroundColor: "#2196F3",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
  },
  balanceText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  transactionHeading: {
    fontSize: 20,
    color: "#ffffff",
    marginTop: 20,
    marginBottom: 10,
  },
  transactionList: {
    marginTop: 10,
  },
  transactionItem: {
    backgroundColor: "#2a3c50",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  transactionText: {
    color: "#ffffff",
    fontSize: 16,
  },
  transactionDate: {
    color: "#a9a9a9",
    fontSize: 12,
    marginTop: 5,
  },
});

export default ProfilePage;
