import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const devices = [
  {
    id: '1',
    name: 'Bork V530',
    type: 'Vacuum cleaner',
    image: require('@/assets/images/vacuum.png'),
  },
  {
    id: '2',
    name: 'LIFX LED Light',
    type: 'Smart bulb',
    image: require('@/assets/images/bulb.png'),
  },
  {
    id: '3',
    name: 'Xiaomi DEM-F600',
    type: 'Humidifier',
    image: require('@/assets/images/humidifier.png'),
  },

  {
    id: 'manual',
  },
];

export default function SearchScreen() {
  const [query, setQuery] = useState('');

  return (
    <View style={styles.container}>
      {/* Title and Status */}
      <View style={styles.headerWrapper}>
              <Text style={styles.title}>Search</Text>
              <View style={styles.rightInfo}>
                <Text style={styles.deviceCount}>6 devices</Text>
                <Ionicons name="wifi" size={18} color="#FFB267" style={styles.wifiIcon} />
                <Text style={styles.wifiLabel}>Resnet-5G</Text>
              </View>
            </View>

      {/* Search Bar */}
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

      {/* Devices Grid */}
      <FlatList
        data={devices}
        numColumns={2}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => {
          if (item.id === 'manual') {
            return (
              <TouchableOpacity style={styles.manualCard}>
                <Ionicons name="wifi-outline" size={28} color="#FFB267" />
                <Text style={styles.deviceName}>Device not found?</Text>
                <Text style={styles.manualText}>Select manually</Text>
              </TouchableOpacity>
            );
          }
        
          return (
            <View style={styles.deviceCard}>
              <Image source={item.image} style={styles.deviceImage} />
              <Text style={styles.deviceName}>{item.name}</Text>
              <Text style={styles.deviceType}>{item.type}</Text>
            </View>
          );
        }}
        
        // ListFooterComponent={
        //   <TouchableOpacity style={styles.manualCard}>
        //     <Ionicons name="wifi-outline" size={28} color="#FFB267" />
        //     <Text style={styles.deviceName}>Device not found?</Text>
        //     <Text style={styles.manualText}>Select manually</Text>
        //   </TouchableOpacity>
        // }
      />

      {/* Add Device Button */}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add device</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#211D1D',
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#282424',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 24,
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
});
