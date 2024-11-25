import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, PermissionsAndroid, Alert, FlatList } from 'react-native';
import BleManager from 'react-native-ble-manager';

const BluetoothComponent = () => {
  const [devices, setDevices] = useState([]);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    // Initialize Bluetooth
    BleManager.start({ showAlert: false })
      .then(() => console.log('Bluetooth initialized'))
      .catch(error => console.error(error));

    // Request Bluetooth permissions
    const requestPermissions = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Permission Denied', 'Location permission is required for Bluetooth.');
        }
      } catch (err) {
        console.error(err);
      }
    };
    requestPermissions();

    return () => {
      BleManager.stopScan();
    };
  }, []);

  const startScan = () => {
    if (!scanning) {
      BleManager.scan([], 5, true)
        .then(() => {
          setScanning(true);
          console.log('Scanning started...');
        })
        .catch(err => console.error(err));
    }
  };

  const handleDiscoverPeripheral = (peripheral) => {
    if (!devices.some(device => device.id === peripheral.id)) {
      setDevices([...devices, peripheral]);
    }
  };

  BleManager.on('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bluetooth Devices</Text>
      <TouchableOpacity onPress={startScan} style={{ padding: 10, backgroundColor: 'blue', marginTop: 20 }}>
        <Text style={{ color: 'white' }}>{scanning ? 'Scanning...' : 'Start Scan'}</Text>
      </TouchableOpacity>
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => console.log(`Selected Device: ${item.name || 'Unnamed Device'}`)}
          >
            <Text>{item.name || 'Unnamed Device'}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default BluetoothComponent;
