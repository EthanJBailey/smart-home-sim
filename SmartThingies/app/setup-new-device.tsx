import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';

export default function AddDeviceScreen() {
  const router = useRouter();
  const [selectedDevice, setSelectedDevice] = useState('');

  const handleNext = () => {
    if (!selectedDevice) {
      alert('Please select a device before continuing.');
      return;
    }

    console.log('Device selected:', selectedDevice);
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>

      <View style={styles.card}>
        <Image
          source={require('@/assets/images/SmartThingies.png')}
          style={styles.icon}
          resizeMode="contain"
        />

        <Text style={styles.title}>Add Your First Device</Text>
        <Text style={styles.subtitle}>Next, add a device to your room:</Text>

        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedDevice}
            onValueChange={(value) => setSelectedDevice(value)}
            style={styles.picker}
            dropdownIconColor="#211D1D"
          >
            <Picker.Item label="Select device from list" value="" />
            <Picker.Item label="Smart Light" value="Smart Light" />
            <Picker.Item label="Thermostat" value="Thermostat" />
            <Picker.Item label="Camera" value="Camera" />
            <Picker.Item label="Smart Plug" value="Smart Plug" />
          </Picker>
        </View>

        <TouchableOpacity
          style={[styles.button, !selectedDevice && styles.buttonDisabled]}
          onPress={handleNext}
          disabled={!selectedDevice}
        >
          <Text style={[styles.buttonText, !selectedDevice && styles.buttonTextDisabled]}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#211D1D',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
    },
    wifi: {
      position: 'absolute',
      top: Platform.OS === 'ios' ? 60 : 40,
      left: 24,
      color: '#AAA',
      fontSize: 12,
    },
    card: {
      width: '100%',
      backgroundColor: '#1A1616',
      borderColor: '#444',
      borderWidth: 1,
      borderRadius: 10,
      padding: 24,
      alignItems: 'center',
    },
    icon: {
        width: 64,
        height: 64,
        marginBottom: 20,
        borderRadius: 12,
        backgroundColor: '#fff',
    },
    title: {
      color: '#FFB267',
      fontSize: 20,
      fontWeight: '600',
      textAlign: 'center',
      marginBottom: 6,
    },
    subtitle: {
      color: '#DDD',
      fontSize: 14,
      textAlign: 'center',
      marginBottom: 20,
    },
    pickerWrapper: {
      width: '100%',
      backgroundColor: '#fff',
      borderRadius: 6,
      marginBottom: 20,
      overflow: 'hidden',
    },
    picker: {
      width: '100%',
      height: 50,
      color: '#211D1D',
    },
    button: {
      backgroundColor: '#FFB267',
      borderRadius: 6,
      paddingVertical: 12,
      paddingHorizontal: 40,
      alignItems: 'center',
    },
    buttonDisabled: {
      backgroundColor: '#888',
    },
    buttonText: {
      color: '#211D1D',
      fontSize: 16,
      fontWeight: '600',
    },
    buttonTextDisabled: {
      color: '#ccc',
    },
  });
  