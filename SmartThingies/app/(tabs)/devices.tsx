import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const devices = [
  { id: '1', name: 'Bork V530', type: 'Vacuum cleaner', image: require('@/assets/images/vacuum.png') },
  { id: '2', name: 'LIFX LED Light', type: 'Smart bulb', image: require('@/assets/images/bulb.png') },
  { id: '3', name: 'Xiaomi DEM-F600', type: 'Humidifier', image: require('@/assets/images/humidifier.png') },
  { id: '4', name: 'Bork V530', type: 'Vacuum cleaner', image: require('@/assets/images/vacuum.png') },
  { id: '5', name: 'LIFX LED Light', type: 'Smart bulb', image: require('@/assets/images/bulb.png') },
  { id: '6', name: 'Xiaomi DEM-F600', type: 'Humidifier', image: require('@/assets/images/humidifier.png') },
];

export default function DevicesScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.title}>All Devices</Text>
        <View style={styles.rightInfo}>
          <Text style={styles.deviceCount}>6 devices</Text>
          <Ionicons name="wifi" size={18} color="#FFB267" style={styles.wifiIcon} />
          <Text style={styles.wifiLabel}>Resnet-5G</Text>
        </View>
      </View>

      <FlatList
        data={devices}
        numColumns={2}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.type}>{item.type}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#211D1D',
    paddingHorizontal: 20,
    paddingTop: 48,
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
  grid: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#282424',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    width: '48%',
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  name: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  type: {
    color: '#FFB267',
    fontSize: 12,
    textAlign: 'center',
  },
});
