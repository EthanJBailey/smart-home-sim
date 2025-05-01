import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddRoomScreen() {
  const [homeName, setHomeName] = useState('');

  useEffect(() => {
    const loadHomeName = async () => {
      try {
        const storedHomeName = await AsyncStorage.getItem('homeName');
        if (storedHomeName) {
          setHomeName(storedHomeName);
        }
      } catch (error) {
        console.error('Failed to load home name:', error);
      }
    };

    loadHomeName();
  }, []);

  const router = useRouter();
  const [selectedRoom, setSelectedRoom] = useState('');

  const handleNext = async () => {
    console.log('Room selected:', selectedRoom);
    if (!selectedRoom) {
      alert('Please select a room before continuing.');
      return;
    } else {
      try {
        // Adjust room IDs based on the updated room names
        const roomId = selectedRoom === 'Living Room' ? 2 : selectedRoom === 'Bedroom' ? 3 : selectedRoom === 'Dining Room' ? 4 : '';
  
        if (!roomId) {
          alert('Invalid room selected.');
          return;
        }
  
        await AsyncStorage.setItem('selectedRoom', selectedRoom);
        router.replace('/setup-new-device');
      } catch (error) {
        console.error('Error saving selected room:', error);
      }
    }
  };
  
  
  return (
    <View style={styles.container}>

      <View style={styles.card}>
        <Image
          source={require('@/assets/images/SmartThingies.png')}
          style={styles.icon}
          resizeMode="contain"
        />

        <Text style={styles.title}>{`${homeName}`}</Text>
        <Text style={styles.subtitle}>Next, add a room to your home:</Text>

        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedRoom}
            onValueChange={(itemValue) => setSelectedRoom(itemValue)}
            style={styles.picker}
            dropdownIconColor="#211D1D"
          >
            <Picker.Item label="Select room from list" value="" />
            <Picker.Item label="Living Room" value="Living Room" />
            <Picker.Item label="Bedroom" value="Bedroom" />
            <Picker.Item label="Dining Room" value="Dining Room" /> {/* Added Dining Room */}
          </Picker>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
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
    buttonText: {
      color: '#211D1D',
      fontSize: 16,
      fontWeight: '600',
    },
  });
  