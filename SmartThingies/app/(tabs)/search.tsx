import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  Alert,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

// Image map using static require
const imageMap = {
  '/assets/images/vacuum.png': require('@/assets/images/vacuum.png'),
  '/assets/images/bulb.png': require('@/assets/images/bulb.png'),
  '/assets/images/humidifier.png': require('@/assets/images/humidifier.png'),
  '/assets/images/unknown.png': require('@/assets/images/humidifier.png'),
};

const deviceTypes = [
  { id: 1, name: 'Vacuum cleaner' },
  { id: 2, name: 'Smart bulb' },
  { id: 3, name: 'Humidifier' },
  { id: 7, name: 'Unknown' },
];

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [devices, setDevices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDevice, setNewDevice] = useState({ name: '', type_id: '', room_id: '' });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [renamedDevice, setRenamedDevice] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchDevices = async () => {
    try {
      const res = await axios.get(`http://146.190.130.85:8000/get-devices-by-keyword?keyword=${query}`);
      const mappedDevices = res.data.map(device => ({
        ...device,
        image: imageMap[device.image] || imageMap['/assets/images/unknown.png'],
      }));
      const limitedDevices = mappedDevices.slice(0, 5);
      setDevices([...limitedDevices, { id: 'manual' }]);
    } catch (err) {
      console.error('Error fetching devices:', err);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, [query]);

  const handleDevicePress = (device) => {
    if (device.id !== 'manual') {
      setSelectedDevice(device);
      setRenamedDevice(device.name);
      setSelectedRoom('');
      setShowConfirmModal(true);
    } else {
      setShowAddModal(true);
    }
  };

  const handleAddDevice = async () => {
    try {
      Keyboard.dismiss();
      setLoading(true);
      await axios.post('http://146.190.130.85:8000/create-device', newDevice);
      setShowAddModal(false);
      setNewDevice({ name: '', type_id: '', room_id: '' });
      fetchDevices();
    } catch (err) {
      Alert.alert('Error', 'Could not add device.');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmAddDevice = async () => {
    try {
      if (!selectedDevice || !selectedRoom) return;
      Keyboard.dismiss();
      setLoading(true);
      const payload = {
        name: renamedDevice || selectedDevice.name || 'Unnamed Device',
        type_id: Number(selectedDevice.type_id) || 7,
        room_id: Number(selectedRoom),
      };
      await axios.post('http://146.190.130.85:8000/create-device', payload);
      setShowConfirmModal(false);
      Alert.alert('Success', `${renamedDevice} has been added.`);
      fetchDevices();
    } catch (err) {
      Alert.alert('Error', 'Could not add device.');
      console.error('Confirm add error:', err?.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  const selectedType = deviceTypes.find((t) => t.id === Number(selectedDevice?.type_id));

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.title}>Search</Text>
        <View style={styles.rightInfo}>
          <Text style={styles.deviceCount}>{devices.length - 1} devices</Text>
          <Ionicons name="wifi" size={18} color="#FFB267" style={styles.wifiIcon} />
          <Text style={styles.wifiLabel}>Resnet-5G</Text>
        </View>
      </View>

      <View style={styles.searchRow}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#FFB267" />
          <TextInput
            placeholder="Search devices or rooms..."
            placeholderTextColor="#888"
            style={styles.input}
            value={query}
            onChangeText={setQuery}
          />
        </View>
        <TouchableOpacity onPress={fetchDevices} style={styles.refreshButton}>
          <Ionicons name="refresh" size={16} color="#211D1D" />
          <Text style={styles.refreshText}>Refresh</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={devices}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          item.id === 'manual' ? (
            <TouchableOpacity style={styles.manualCard} onPress={() => setShowAddModal(true)}>
              <Ionicons name="wifi-outline" size={28} color="#FFB267" />
              <Text style={styles.deviceName}>Device not found?</Text>
              <Text style={styles.manualText}>Select manually</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.deviceCard} onPress={() => handleDevicePress(item)}>
              <Image source={item.image} style={styles.deviceImage} />
              <Text style={styles.deviceName}>{item.name}</Text>
              <Text style={styles.deviceType}>{item.type}</Text>
            </TouchableOpacity>
          )
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => setShowAddModal(true)}>
        <Text style={styles.addButtonText}>Add device</Text>
      </TouchableOpacity>

      <Modal transparent={true} visible={showAddModal} animationType="fade">
        <View style={modalStyles.overlay}>
          <View style={modalStyles.modalView}>
            <Text style={styles.title}>Add New Device</Text>

            <TextInput
              placeholder="Name"
              placeholderTextColor="#888"
              style={modalStyles.modalInput}
              value={newDevice.name}
              onChangeText={(text) => setNewDevice({ ...newDevice, name: text })}
            />

            <Picker
              selectedValue={newDevice.type_id}
              onValueChange={(value) => setNewDevice({ ...newDevice, type_id: value })}
              style={{ color: '#fff', backgroundColor: '#393535', borderRadius: 12, width: '100%' }}
            >
              <Picker.Item label="Select Device Type" value="" />
              <Picker.Item label="Vacuum cleaner" value={1} />
              <Picker.Item label="Smart bulb" value={2} />
              <Picker.Item label="Humidifier" value={3} />
              <Picker.Item label="Unknown" value={7} />
            </Picker>

            <Picker
              selectedValue={newDevice.room_id}
              onValueChange={(value) => setNewDevice({ ...newDevice, room_id: value })}
              style={{ color: '#fff', backgroundColor: '#393535', borderRadius: 12, width: '100%', marginTop: 10 }}
            >
              <Picker.Item label="Select Room" value="" />
              <Picker.Item label="Living Room" value={2} />
              <Picker.Item label="Bedroom" value={3} />
              <Picker.Item label="Dining Room" value={4} />
            </Picker>

            <Pressable style={modalStyles.modalBtn} onPress={handleAddDevice} disabled={loading}>
              {loading ? <ActivityIndicator color="#211D1D" /> : <Text>Add</Text>}
            </Pressable>

            <Pressable style={modalStyles.closeBtn} onPress={() => setShowAddModal(false)}>
              <Text style={{ color: '#fff' }}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {selectedDevice && (
        <Modal transparent={true} visible={showConfirmModal} animationType="fade">
          <View style={modalStyles.overlay}>
            <View style={modalStyles.modalView}>
              <Text style={styles.title}>Confirm Device</Text>

              <TextInput
                placeholder="Rename Device"
                placeholderTextColor="#888"
                style={modalStyles.modalInput}
                value={renamedDevice}
                onChangeText={setRenamedDevice}
              />

              <Picker
                selectedValue={selectedDevice?.type_id || 7}
                enabled={false}
                style={{
                  color: '#fff',
                  backgroundColor: '#393535',
                  borderRadius: 12,
                  width: '100%',
                  marginBottom: 10,
                }}
              >
                {deviceTypes.map((type) => (
                  <Picker.Item key={type.id} label={type.name} value={type.id} />
                ))}
              </Picker>


              <Picker
                selectedValue={selectedRoom}
                onValueChange={(value) => setSelectedRoom(value)}
                style={{ color: '#fff', backgroundColor: '#393535', borderRadius: 12, width: '100%' }}
              >
                <Picker.Item label="Select Room" value="" />
                <Picker.Item label="Living Room" value={2} />
                <Picker.Item label="Bedroom" value={3} />
                <Picker.Item label="Dining Room" value={4} />
              </Picker>

              <Pressable
                style={[modalStyles.modalBtn, { opacity: selectedRoom ? 1 : 0.5 }]}
                disabled={!selectedRoom || loading}
                onPress={handleConfirmAddDevice}
              >
                {loading ? <ActivityIndicator color="#211D1D" /> : <Text>Add Device</Text>}
              </Pressable>

              <Pressable style={modalStyles.closeBtn} onPress={() => setShowConfirmModal(false)}>
                <Text style={{ color: '#fff' }}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#282424',
    padding: 20,
    borderRadius: 20,
    width: '80%',
    alignItems: 'center',
  },
    modalInput: {
    backgroundColor: '#393535',
    color: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 10,
    width: '100%',
    height:50,
  },
  modalBtn: {
    backgroundColor: '#FFB267',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  closeBtn: {
    marginTop: 20,
    backgroundColor: '#393535',
    padding: 10,
    borderRadius: 8,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#211D1D',
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 20,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  rightInfo: {
    paddingTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  deviceCount: {
    color: '#FFB267',
    marginRight: 6,
  },
  wifiIcon: {
    marginRight: 4,
  },
  wifiLabel: {
    color: '#FFFFFF',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#282424',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flex: 1,
    marginRight: 8,
  },
  
  input: {
    color: '#FFFFFF',
    marginLeft: 10,
    flex: 1,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  deviceCard: {
    backgroundColor: '#282424',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
  },
  deviceImage: {
    width: 64,
    height: 64,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  deviceName: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  deviceType: {
    color: '#AAA',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
  manualCard: {
    width: '48%',
    height: 144,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#FFB267',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    alignSelf: 'center',
    marginTop: 8,
  },
  manualText: {
    color: '#FFB267',
    fontSize: 12,
    marginTop: 4,
  },
  addButton: {
    backgroundColor: '#FFB267',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 'auto',
  },
  addButtonText: {
    color: '#211D1D',
    fontWeight: 'bold',
    fontSize: 16,
  },

  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFB267',
    paddingHorizontal: 14,
    borderRadius: 12,
    height: 58,
  },
  
  refreshText: {
    marginLeft: 6,
    color: '#211D1D',
    fontWeight: 'bold',
  },
});
