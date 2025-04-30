import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Switch,
  Pressable,
  Animated,
  findNodeHandle
} from 'react-native';
import Slider from '@react-native-community/slider';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useScrollTo } from 'react-native-scroll-to-hook';

const rooms = ['Home', 'Bedroom', 'Living Room'];

const mockDevices = {
  Home: [
    {
      id: 1,
      name: 'Humidifier',
      icon: 'air-humidifier',
      value: '36%',
      mode: 'Mode 2',
    },
    {
      id: 2,
      name: 'Air Purifier',
      icon: 'air-purifier',
      value: '73%',
      mode: 'On',
    },
  ],
  Bedroom: [
    {
      id: 3,
      name: 'Ceiling Fan',
      icon: 'fan',
      value: 'Medium',
      mode: 'On',
    },
  ],
  'Living Room': [
    {
      id: 4,
      name: 'Lamp',
      icon: 'floor-lamp',
      value: '45%',
      mode: 'Dim',
    },
  ],
};

const notifications = [
  { id: 1, message: 'Replace filter in Humidifier' },
  { id: 2, message: 'Air Purifier needs maintenance' },
];

export default function HomeScreen() {
  const [selectedRoom, setSelectedRoom] = useState('Home');
  const scrollRef = useRef<ScrollView>(null);
  const notificationRef = useRef<View>(null);

  const handleBellPress = () => {
    if (notificationRef.current && scrollRef.current) {
      notificationRef.current.measureLayout(
        findNodeHandle(scrollRef.current),
        (_x, y) => {
          scrollRef.current?.scrollTo({ y, animated: true });
        },
        () => {}
      );
    }
  };

  const devices = mockDevices[selectedRoom] || [];

  return (
    <ScrollView ref={scrollRef} style={styles.container}>
      <ImageBackground
        source={require('@/assets/images/bedroom.jpg')}
        style={styles.headerImage}
      >
        <View style={styles.topBar}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.roomTabs}>
            {rooms.map((room) => (
              <TouchableOpacity key={room} onPress={() => setSelectedRoom(room)}>
                <Text
                  style={[
                    styles.tab,
                    selectedRoom === room && styles.selectedTab,
                  ]}
                >
                  {room}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity onPress={handleBellPress}>
            <Feather name="bell" size={24} color="#FFB267" />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{selectedRoom} Devices</Text>
        <View style={styles.deviceGrid}>
          {devices.map((device) => (
            <View key={device.id} style={styles.deviceCard}>
              <View style={styles.iconRow}>
                <MaterialCommunityIcons name={device.icon} size={24} color="#FFB267" />
                <Text style={styles.deviceTitle}>{device.value}</Text>
              </View>
              <Text style={styles.deviceSubtitle}>{device.name}</Text>
              <View style={styles.switchRow}>
                <Text style={styles.modeLabel}>{device.mode}</Text>
                <Switch value={true} thumbColor="#FFB267" />
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Light Controls</Text>
        <View style={styles.sliderRow}>
          <Feather name="sun" size={20} color="#FFB267" />
          <Text style={styles.sliderLabel}>Main Light</Text>
        </View>
        <Slider minimumTrackTintColor="#FFB267" maximumTrackTintColor="#393535" />

        <View style={styles.sliderRow}>
          <Feather name="moon" size={20} color="#FFB267" />
          <Text style={styles.sliderLabel}>Floor Lamp</Text>
        </View>
        <Slider minimumTrackTintColor="#FFB267" maximumTrackTintColor="#393535" />
      </View>

      <View ref={notificationRef} style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        {notifications.map((notif) => (
          <View key={notif.id} style={styles.notificationItem}>
            <MaterialCommunityIcons name="bell" size={24} color="#FFB267" />
            <Text style={styles.notificationText}>{notif.message}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#211D1D',
  },
  headerImage: {
    width: '100%',
    height: 320,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  roomTabs: {
    flexDirection: 'row',
    gap: 12,
  },
  tab: {
    color: '#FFFFFFAA',
    fontSize: 16,
    marginRight: 16,
    fontWeight: '500',
  },
  selectedTab: {
    color: '#FFB267',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: '#FFB267',
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  sectionTitle: {
    color: '#FFB267',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  deviceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  deviceCard: {
    backgroundColor: '#282424',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    marginBottom: 16,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  deviceTitle: {
    color: '#FFB267',
    fontSize: 20,
    fontWeight: 'bold',
  },
  deviceSubtitle: {
    color: '#FFFFFF',
    marginTop: 4,
    marginBottom: 8,
    fontSize: 14,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modeLabel: {
    color: '#FFFFFF',
    fontSize: 14,
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
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  notificationText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});


// import React, { useEffect, useRef, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ImageBackground,
//   ScrollView,
//   TouchableOpacity,
//   Switch,
//   findNodeHandle,
// } from 'react-native';
// import Slider from '@react-native-community/slider';
// import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';

// const ROOMS = ['Home', 'Bedroom', 'Living Room'];

// export default function HomeScreen() {
//   const [selectedRoom, setSelectedRoom] = useState('Home');
//   const [devices, setDevices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const scrollRef = useRef<ScrollView>(null);
//   const notificationRef = useRef<View>(null);

//   useEffect(() => {
//     const fetchDevices = async () => {
//       try {
//         const response = await fetch('http://146.190.130.85:8000/get-devices');
//         const data = await response.json();
//         setDevices(data);
//       } catch (error) {
//         console.error('Failed to fetch devices:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDevices();
//   }, []);

//   const handleBellPress = () => {
//     if (notificationRef.current && scrollRef.current) {
//       notificationRef.current.measureLayout(
//         findNodeHandle(scrollRef.current),
//         (_x, y) => {
//           scrollRef.current?.scrollTo({ y, animated: true });
//         },
//         () => {}
//       );
//     }
//   };

//   const roomDevices = devices.filter(
//     (device) => device.room_name === selectedRoom
//   );

//   const notifications = [
//     { id: 1, message: 'Replace filter in Humidifier' },
//     { id: 2, message: 'Air Purifier needs maintenance' },
//   ];

//   return (
//     <ScrollView ref={scrollRef} style={styles.container}>
//       <ImageBackground
//         source={require('@/assets/images/bedroom.jpg')}
//         style={styles.headerImage}
//       >
//         <View style={styles.topBar}>
//           <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.roomTabs}>
//             {ROOMS.map((room) => (
//               <TouchableOpacity key={room} onPress={() => setSelectedRoom(room)}>
//                 <Text
//                   style={[
//                     styles.tab,
//                     selectedRoom === room && styles.selectedTab,
//                   ]}
//                 >
//                   {room}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//           <TouchableOpacity onPress={handleBellPress}>
//             <Feather name="bell" size={24} color="#FFB267" />
//           </TouchableOpacity>
//         </View>
//       </ImageBackground>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>{selectedRoom} Devices</Text>
//         {loading ? (
//           <Text style={styles.loadingText}>Loading devices...</Text>
//         ) : roomDevices.length === 0 ? (
//           <Text style={styles.loadingText}>No devices found in this room.</Text>
//         ) : (
//           <View style={styles.deviceGrid}>
//             {roomDevices.map((device) => (
//               <View key={device.id} style={styles.deviceCard}>
//                 <View style={styles.iconRow}>
//                   <MaterialCommunityIcons name={device.icon || 'cog'} size={24} color="#FFB267" />
//                   <Text style={styles.deviceTitle}>{device.value || '--'}</Text>
//                 </View>
//                 <Text style={styles.deviceSubtitle}>{device.name}</Text>
//                 <View style={styles.switchRow}>
//                   <Text style={styles.modeLabel}>{device.mode || 'Unknown'}</Text>
//                   <Switch value={true} thumbColor="#FFB267" />
//                 </View>
//               </View>
//             ))}
//           </View>
//         )}
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Light Controls</Text>
//         <View style={styles.sliderRow}>
//           <Feather name="sun" size={20} color="#FFB267" />
//           <Text style={styles.sliderLabel}>Main Light</Text>
//         </View>
//         <Slider minimumTrackTintColor="#FFB267" maximumTrackTintColor="#393535" />
//         <View style={styles.sliderRow}>
//           <Feather name="moon" size={20} color="#FFB267" />
//           <Text style={styles.sliderLabel}>Floor Lamp</Text>
//         </View>
//         <Slider minimumTrackTintColor="#FFB267" maximumTrackTintColor="#393535" />
//       </View>

//       <View ref={notificationRef} style={styles.section}>
//         <Text style={styles.sectionTitle}>Notifications</Text>
//         {notifications.map((notif) => (
//           <View key={notif.id} style={styles.notificationItem}>
//             <MaterialCommunityIcons name="bell" size={24} color="#FFB267" />
//             <Text style={styles.notificationText}>{notif.message}</Text>
//           </View>
//         ))}
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#211D1D',
//   },
//   headerImage: {
//     width: '100%',
//     height: 320,
//     justifyContent: 'flex-end',
//     paddingHorizontal: 16,
//     paddingBottom: 12,
//   },
//   topBar: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   roomTabs: {
//     flexDirection: 'row',
//   },
//   tab: {
//     color: '#FFFFFFAA',
//     fontSize: 16,
//     marginRight: 16,
//     fontWeight: '500',
//   },
//   selectedTab: {
//     color: '#FFB267',
//     fontWeight: 'bold',
//     borderBottomWidth: 2,
//     borderBottomColor: '#FFB267',
//   },
//   section: {
//     paddingHorizontal: 16,
//     paddingTop: 20,
//   },
//   sectionTitle: {
//     color: '#FFB267',
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 12,
//   },
//   loadingText: {
//     color: '#FFFFFFAA',
//     fontStyle: 'italic',
//     paddingVertical: 8,
//   },
//   deviceGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   deviceCard: {
//     backgroundColor: '#282424',
//     borderRadius: 12,
//     padding: 16,
//     width: '48%',
//     marginBottom: 16,
//   },
//   iconRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   deviceTitle: {
//     color: '#FFB267',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   deviceSubtitle: {
//     color: '#FFFFFF',
//     marginTop: 4,
//     marginBottom: 8,
//     fontSize: 14,
//   },
//   switchRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   modeLabel: {
//     color: '#FFFFFF',
//     fontSize: 14,
//   },
//   sliderRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//     marginTop: 12,
//   },
//   sliderLabel: {
//     color: '#FFFFFF',
//     fontSize: 16,
//   },
//   notificationItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//     marginBottom: 12,
//   },
//   notificationText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//   },
// });
