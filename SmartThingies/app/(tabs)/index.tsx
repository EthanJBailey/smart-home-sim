import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Switch,
  Platform,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';
import { useUser } from '@/contexts/UserContext';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();
  const {user} = useUser();
  // Ensure user is logged in.
  useEffect(() => {
      if (!user) {
        requestAnimationFrame(() => {
          router.replace('/login');
        })
      }
    })
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('@/assets/images/bedroom.jpg')}
        style={styles.headerImage}
        imageStyle={{ borderRadius: 16 }}
      >
        <View style={styles.roomTabs}>
          <Text style={styles.tab}>Home</Text>
          <Text style={styles.tab}>Bedroom</Text>
          <Text style={styles.tab}>Living Room</Text>
        </View>
      </ImageBackground>

      <View style={styles.deviceStatusContainer}>
        <View style={styles.deviceCard}>
          <View style={styles.iconRow}>
            <MaterialCommunityIcons name="air-humidifier" size={24} color="#FFB267" />
            <Text style={styles.deviceTitle}>36%</Text>
          </View>
          <Text style={styles.deviceSubtitle}>Humidifier{"\n"}Air</Text>
          <View style={styles.switchRow}>
            <Text style={styles.modeLabel}>Mode 2</Text>
            <Switch value={true} thumbColor="#FFB267" />
          </View>
        </View>

        <View style={styles.deviceCard}>
          <View style={styles.iconRow}>
            <MaterialCommunityIcons name="air-purifier" size={24} color="#FFB267" />
            <Text style={styles.deviceTitle}>73%</Text>
          </View>
          <Text style={styles.deviceSubtitle}>Purifier{"\n"}Air</Text>
          <View style={styles.switchRow}>
            <Text style={styles.modeLabel}>On</Text>
            <Switch value={true} thumbColor="#FFB267" />
          </View>
        </View>
      </View>

      <View style={styles.sliderContainer}>
        <View style={styles.sliderRow}>
          <Feather name="sun" size={20} color="#FFB267" />
          <Text style={styles.sliderLabel}>Main light</Text>
        </View>
        <Slider minimumTrackTintColor="#FFB267" maximumTrackTintColor="#393535" />

        <View style={styles.sliderRow}>
          <Feather name="moon" size={20} color="#FFB267" />
          <Text style={styles.sliderLabel}>Floor lamp</Text>
        </View>
        <Slider minimumTrackTintColor="#FFB267" maximumTrackTintColor="#393535" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#211D1D',
    padding: 16,
  },
  headerImage: {
    width: '100%',
    height: 350,
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  roomTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 10,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  tab: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  deviceStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  deviceCard: {
    backgroundColor: '#282424',
    borderRadius: 12,
    padding: 16,
    width: '48%',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  deviceTitle: {
    color: '#FFB267',
    fontSize: 24,
    fontWeight: 'bold',
  },
  deviceSubtitle: {
    color: '#FFFFFF',
    marginTop: 4,
    marginBottom: 8,
  },
  modeLabel: {
    color: '#FFFFFF',
  },
  sliderContainer: {
    backgroundColor: '#282424',
    borderRadius: 12,
    padding: 16,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },
  sliderLabel: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
